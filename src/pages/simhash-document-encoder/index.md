---
date: 2019-04-23
title: SimHash Document Encoder
image: image.png
keywords: simhash, document, encoder
---

::: section

::: article
The SimHash Document Encoder is now live in [htm.core][htmcore], for both C++
and Python. It provides simple and immediate encoding of text for use with
[Hierarchical Temporal Memory][htm] (HTM). This may be of interest to Natural
Language Processing (NLP), Search, or HTM engineers.

The SimHash Document Encoder converts text-based documents into
[Sparse Distributed Representations][sdr] (SDR), ready for use with HTM.
Similar documents will result in similar encodings, while dissimilar documents
will have differing encodings. "Similarity" here refers to *bitwise*
similarity (small hamming distance, high overlap), not *semantic*
similarity (encodings for "apple" and "computer" will have no relation here).
:::

::: aside
![mcimage](image.png)
:::

:::

## Usage

### C++

```cpp
#include <htm/encoders/types/Sdr.hpp>
#include <htm/encoders/SimHashDocumentEncoder.hpp>

SimHashDocumentEncoderParameters params;
params.size = 400u;
params.activeBits = 21u;

SDR output({ params.size });
SimHashDocumentEncoder encoder(params);

encoder.encode({ "bravo", "delta", "echo" }, output);
encoder.encode("bravo delta echo", output);  // same
```

### Python

```python
from htm.bindings.encoders import \
  SimHashDocumentEncoder,
  SimHashDocumentEncoderParameters

params = SimHashDocumentEncoderParameters()
params.size = 400
params.activeBits = 21

encoder = SimHashDocumentEncoder(params)

other = encoder.encode([ "bravo", "delta", "echo" ])
other = encoder.encode("bravo delta echo")  # same
```

#### Python Example Runner

Generate a bunch of random documents, and find the most/least similar. Also,
generate charts of the entire encoding space.

```bash
python -m htm.examples.encoders.simhash_document_encoder --help
```

Example output:

```bash
Statistics:
	Encoded 1000 Document inputs.
	Output: SDR( 400 )
    Sparsity Min/Mean/Std/Max 0.11 / 0.11 / 5.07831e-07 / 0.11
    Activation Frequency Min/Mean/Std/Max 0.011 / 0.11 / 0.0696577 / 0.483
    Entropy 0.935725
    Overlap Min/Mean/Std/Max 0 / 0.151834 / 0.061668 / 0.386364
Similarity:
	Reference:
		['also', 'high', 'low', 'mean', 'part', 'tell', 'try', 'where', 'world']
	MOST Similar (Distance = 54):
		['differ', 'here', 'high', 'low', 'off', 'off', 'tell', 'try', 'where']
	LEAST Similar (Distance = 88):
		['add', 'ask', 'came', 'even', 'give', 'name', 'very', 'well', 'why']
```

#### Python Module Help

```bash
python
>>> import htm.bindings.encoders
>>> help(htm.bindings.encoders.SimHashDocumentEncoder)
```

## Learn More

### File Links  

  - Encoder README
  - Headers: C++
  - Source: C++, Python
  - Tests: C++, Python

### SimHash

[SimHash][simhash] is a [Locality-Sensitive Hashing][lsh] (LSH) algorithm from
the world of nearest-neighbor document similarity search. It is used by the
GoogleBot Web Crawler to find near-duplicate web pages.

link README

### HTM.core

[HTM.core][htmcore] is the active [HTM Community][htmcommunity] fork of
[Numenta][numenta]'s hibernating [NuPIC][nupic] HTM codebase. Thanks again to
@breznak, @dmac, and @dkeeney from the team for their help and support, they've
got a beautiful codebase going.

### Semantic Similarity

For similar encodings that support *semantic* similarity (encodings for
"apple" and "computer" will relate), [Cortical.io][cortical-io] offers their
highly recommended Semantic Folding technology.

*[HTM]: Hierarchical Temporal Memory
*[LSH]: Locality-Sensitive Hashing
*[NLP]: Natural Language Processing
*[SDR]: Sparse Distributed Representation

[cortical-io]: https://cortical.io
[htm]: https://numenta.com/machine-intelligence-technology/
[htm-core]: https://github.com/htm-community/htm.core#readme
[lsh]: https://en.wikipedia.org/wiki/Locality-sensitive_hashing
[numenta]: https://numenta.com
[sdr]: https://numenta.com/neuroscience-research/sparse-distributed-representations/
[simhash]: https://en.wikipedia.org/wiki/SimHash
[simhash-cpp]: https://github.com/htm-community/htm.core/blob/master/src/htm/encoders/SimHashDocumentEncoder.hpp
[simhash-cpp-test]: https://
[simhash-py]: https://github.com/htm-community/htm.core/blob/master/bindings/py/cpp_src/bindings/encoders/py_SimHashDocumentEncoder.cpp
[simhash-py-test]: https://
[simhash-readme]: https://github.com/htm-community/htm.core/blob/master/src/htm/encoders/SimHashDocumentEncoder.README.md
