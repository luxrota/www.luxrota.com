---
title: "SimHash Distributed Scalar Encoder (SHaDSE)"
date: "2019-04-18"
---

A [Locality-Sensitive Hashing][lsh] approach towards encoding semantic
data into [Sparse Distributed Representations][sdr], ready to be fed
into an [Hierarchical Temporal Memory][htm], like [NuPIC][nupic] by
[Numenta][numenta]. This uses the [SimHash][simhash] algorithm to
accomplish this. LSH and SimHash come from the world of
nearest-neighbor document similarity searching.

This encoder is sibling with the original [Scalar Encoder][scalar],
and the [Random Distributed Scalar Encoder][rdse] (RDSE). The static
bucketing strategy here is generally lifted straight from the RDSE,
although the "contents" and representations are created differently.

Instead of creating a random hash for our target bucket, we first
generate a [SHA-3+SHAKE256][sha3] hash of the bucket index (the
SHAKE extension provides a variable-length hash (`n`)). Using that
hash, and hash values from nearby neighbor buckets (within
`bucketRadius`), we then create a weighted SimHash for our target
bucket index. This SimHash output will represent both individual bucket
value, and represent the relations between nearby neighbor values in
bucket space. A stable number of On bits (`w`) is achieved during final
collapsing step of SimHashing.


### Scalar Encoder Feature Comparison

| | Original<br/>Scalar | Random<br/>Distributed | SimHash<br/>Distributed |
|---|---|---|---|---|
| Collisions<br/>Allowed | No | Yes | Yes |
| Semantic<br/>Continuity | Physical<br/>Adjacency | Custom<br/>Random Map | SimHashing |
| Periodic<br/>Wrapping | Yes | No | Yes<sup>1</sup> |
| Lookup<br/>Tables | No | Yes | No |
| Topology<br/>Supported | Yes | No | No |
| Required<br/>Params | minval<br/>maxval | resolution | resolution |
| Other<br/>Params | radius<br/>resolution<br/>periodic | | bucketRadius<br/>periodic |

<small>
  &nbsp;&nbsp;&nbsp;<sup>1</sup>Encodings for wrapped edge buckets
    will adapt with bucket growth
</small>


### Scalar Encoder Performance Comparison

Tests were run against the simple model presented in the
[NuPIC Docs Algo Tutorial][tutor]. The usual "HotGym"
[`rec-center-hourly.csv`][hotgym] data was used (first 3000 rows, as
per tutorial code). The body of that article contains all settings
used for the Spatial Pooler, Temporal Memory, and SDR Classifier.
Any changes to Encoder settings are noted below.

| | Original<br/>Scalar | Random<br/>Distributed | SimHash<br/>Distributed |
|---|---|---|---|---|
| Settings | minval=0<br/>maxval=100 | resolution=0.4 | resolution=0.25 |
| MAPE | 0.327 | 0.300 | 0.294 |
| MAE | 5.599 | 5.438 | 5.954 |
| RMSE | 9.257 | 8.838 | 10.296 |
| NLL 1k | 3.396 | 2.626 | 3.368 |
| Time | 45.32s | 46.06s | 65.71s<sup>1</sup> |
| Distance<sup>2</sup> | 2 (stable) | 2 (stable) | 4-10 (variable) |

<small>
  &nbsp;&nbsp;&nbsp;<sup>1</sup>Speed can easily be brought up with
    internal lookup tables
  <br/>
  &nbsp;&nbsp;&nbsp;<sup>2</sup>Average Hamming distance between two
    adjacent buckets
</small>


### How It Works

##### Step 1 - Input some scalar values:

| Time | Input |
| --- | --- |
| 0 | 27.7 |
| 1 | 10.2 |
| 2 | 16.3 |
| 3 | 16.4 |
| 4 | 7.6  |
| 5 | 22.9 |

##### Step 2 - Map inputs to buckets:

Map input values to bucket indexes, using the
[formula from the RDSE][bucket].

```
  bucketIndex = (
    (bucketsWidth / 2) + int(round(
      (input - bucketOffset) / resolution)
    )
  )
```

| Input | Bucket |
| ----- | ------ |
| 27.7 | 5 |
| 10.2 | 2 |
| 16.3 | 3 |
| 16.4 | 3 |
| 7.6  | 1 |
| 22.9 | 4 |

##### Step 3 - Hash bucket index

Hash bucket index value of a target bucket (**3**), and
neighbors (`bucketRadius`=2).

| Bucket | Hash |
| --- | --- |
| 1 | 00110101 |
| 2 | 11011010 |
| **3** | **01110111** |
| 4 | 00011011 |
| 5 | 10101100 |

##### Step 4 - Convert binary 0's in hashes to integer -1:

| Bucket | Hash Columns |
| --- | --- |
| 1 | -1 -1 +1 +1 -1 +1 -1 +1 |
| 2 | +1 +1 -1 +1 +1 -1 +1 -1 |
| **3** | **-1 +1 +1 +1 -1 +1 +1 +1** |
| 4 | -1 -1 -1 +1 +1 -1 +1 +1 |
| 5 | +1 -1 +1 -1 +1 +1 -1 -1 |

##### Step 5 - Weight bucket hashes:

Weight bucket hashes. The target bucket (**3**) in center of
`bucketRadius` is heaviest.

| Bucket | Weight | Hash Columns |
| --- | --- | --- |
| 1 | 1 | -1 -1 +1 +1 -1 +1 -1 +1 |
| 2 | 2 | +2 +2 -2 +2 +2 -2 +2 -2 |
| **3** | **3** | **-3 +3 +3 +3 -3 +3 +3 +3** |
| 4 | 2 | -2 -2 -2 +2 +2 -2 +2 +2 |
| 5 | 1 | +1 -1 +1 -1 +1 +1 -1 -1 |

##### Step 6 - Sum weighted binary columns:

| Bucket | Hash Column Summations |
| --- | --- |
| **3** | **-3 1 1 7 1 1 5 3** |

##### Step 7 - Collapse integer sums back to binary:

Collapse the sums back to binary for a final SimHash value for our
target bucket (**3**).

A regular SimHash will change all sums `>= 0` to a binary `1`, while
all sums `< 0` are changed to a binary `0`. This SimHash will usually
result in about 50% sparsity.

We can further sparsify a SimHash for our needs by collapsing down
based on a certain number of the highest sums (here, `w`=3):

| Bucket | Sparse SimHash |
| --- | --- |
| **3** | **0 0 0 1 0 0 1 1** |

This SimHash encoded representation will identify both our specific
target bucket, **and** the relation of our target bucket to it's
near neighbors (descending outward with `bucketRadius`).


### Source Code

* [Pull Request against Old NuPIC][pr].
* [Research Repo][repo] with my test runners and original research code.


### Next Steps

* Create C++ version for Community NuPIC.cpp (I plan on doing this).
* Find a way to lower and stabilize the average Hamming distance
  between buckets, but guarantee it doesn't bottom out.
  [This video][lshstat] seems helpful, but is beyond me.
* Adaptive versions to compare against Adaptive Scalar Encoder?
* What about other [Locality-Sensitive Hashing][lsh] algorithms
  and methods, like [MinHash][minhash]?
* Math Readers: Does [Locality-Preserving Hashing][lph] also
  apply? Would it add support for topology?
* It seems to me like the [SimHash][simhash] algorithm could
  easily be performed biologically, in accordance with our
  current theories. I can't help but wonder if this is somehow
  related to how the neocortex encodes and pools.


### Learn More

* [HTM Community Discussion][disc]
* [SimHash Document Encoder][shadde]
* [HTM School: Encoders Video][vidschool]
* [RDSE Video][vidrdse]
* [Locality-Sensitive Hashing Video][vidlsh]
* [SimHash Video][vidsim]


[bucket]: https://github.com/numenta/nupic/blob/master/src/nupic/encoders/random_distributed_scalar.py#L210-L212
[disc]: https://discourse.numenta.org/t/new-simhash-distributed-scalar-encoder-shadse/5860
[hotgym]: https://github.com/numenta/nupic/blob/master/examples/opf/clients/hotgym/prediction/one_gym/rec-center-hourly.csv
[htm]: https://numenta.com/machine-intelligence-technology/
[lph]: https://www.google.com/search?hl=en&q=locality%20preserving%20hashing
[lsh]: https://en.wikipedia.org/wiki/Locality-sensitive_hashing
[lshstat]: https://www.youtube.com/watch?v=h21irtHDsBw
[minhash]: https://en.wikipedia.org/wiki/MinHash
[numenta]: https://numenta.com
[nupic]: https://github.com/numenta/nupic
[pr]: https://github.com/numenta/nupic/pull/3872
[rdse]: https://github.com/numenta/nupic/blob/master/src/nupic/encoders/random_distributed_scalar.py
[repo]: https://github.com/luxrota/simhash_htm_encoders
[scalar]: https://github.com/numenta/nupic/blob/master/src/nupic/encoders/scalar.py
[sdr]: https://numenta.com/neuroscience-research/sparse-distributed-representations/
[shadde]: https://www.luxrota.com/articles/2019/04/23/simhash-distributed-document-encoder-for-htm.html
[sha3]: https://en.wikipedia.org/wiki/SHA-3
[simhash]: https://en.wikipedia.org/wiki/SimHash
[tutor]: https://nupic.docs.numenta.org/stable/quick-start/algorithms.html
[vidrdse]: https://www.youtube.com/watch?v=_q5W2Ov6C9E
[vidschool]: https://www.youtube.com/watch?v=V3Yqtpytif0&list=PL3yXMgtrZmDqhsFQzwUC9V8MeeVOQ7eZ9&index=7&t=0s
[vidsim]: https://www.youtube.com/watch?v=gnraT4N43qo
[vidlsh]: https://www.youtube.com/watch?v=dgH0NP8Qxa8

