---
date: "2019-10-20"
title: "SimHash Document Encoder"
image: "simhash-document-encoder.svg"
keywords: "simhash, document, encoder"
---

::: section
::: article

The [SimHash Document Encoder][encoder-cpp] is now live in [HTM.core][htm-core]
as C++ with Python bindings. It provides the simple and immediate encoding of
text for use with [Hierarchical Temporal Memory][htm] (HTM), a machine
intelligence framework. This may be of interest to Natural Language
Processing (NLP), Search, or HTM engineers.

The SimHash Document Encoder converts text-based documents into
[Sparse Distributed Representations][sdr] (SDR), "the brain's data structure,"
ready for use with HTM. Similar documents will result in similar encodings,
while dissimilar documents will have differing encodings. "Similarity" here
refers to *bitwise* similarity (small hamming distance, high overlap), not
*semantic* similarity (encodings for "apple" and "computer" will have no
relation here).

:::
::: aside

![Abstract Text Artwork](simhash-document-encoder.svg)

:::
:::

## Usage

A wide selection of helpful parameters can be passed to the encoder, including
options for setting token case sensitivity, vocabulary, weightings,
exclusions, frequency ceiling/flooring, orphan handling, and character
similarity sensitivity. The [documentation in the header file][encoder-cpp]
has more details.

### C++

The following is a usage example in C++:

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

The [C++ Unit Tests][encoder-cpp-test] provide more usage examples.

### Python

The following is a usage example in Python:

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

The [Python Unit Tests][encoder-py-test] provide more usage information.

#### Python Example Runner

An example of the encoder in action is provided in Python. It will generate
many random documents, and find the most/least similar. It will also generate a
visual chart of encoding space usage.

For help getting started:

```bash
python \
  -m htm.examples.encoders.simhash_document_encoder \
  --help
```

To run a simple example:

```bash
python \
  -m htm.examples.encoders.simhash_document_encoder \
  --size 400 \
  --activeBits 150
```

#### Python Module Help

Helpful documentation on encoder parameters and usage is available in Python
module form:

```bash
python
>>> import htm.bindings.encoders
>>> help(htm.bindings.encoders.SimHashDocumentEncoder)
```

## Learn More

### HTM.core

[HTM.core][htm-core] is the active [HTM Community][htm-community] fork of
[Numenta][numenta]'s hibernating [NuPIC][nupic] HTM codebase. Thanks again to
the team for their help and support, they've got a beautiful codebase, and are wonderful to work with.

### SimHash

[SimHash][simhash] is a [Locality-Sensitive Hashing][lsh] (LSH) algorithm from
the world of nearest-neighbor document similarity search. It is used by the
GoogleBot Web Crawler to find near-duplicate web pages.

We provide an [encoder-specific README][encoder-readme] file for an in-depth
tour of the SimHash algorithm.

### Semantic Similarity

For encodings that *do* support *semantic* similarity (encodings for
"apple" and "computer" will relate), [Cortical.io][cortical-io] offers their
highly-recommended Semantic Folding technology.

[cortical-io]: https://cortical.io
[encoder-cpp]: https://github.com/htm-community/htm.core/blob/master/src/htm/encoders/SimHashDocumentEncoder.hpp#L140
[encoder-cpp-test]: https://github.com/htm-community/htm.core/blob/master/src/test/unit/encoders/SimHashDocumentEncoderTest.cpp
[encoder-readme]: https://github.com/htm-community/htm.core/blob/master/src/htm/encoders/SimHashDocumentEncoder.README.md
[encoder-py]: https://github.com/htm-community/htm.core/blob/master/bindings/py/cpp_src/bindings/encoders/py_SimHashDocumentEncoder.cpp
[encoder-py-test]: https://github.com/htm-community/htm.core/blob/master/bindings/py/tests/encoders/simhash_document_encoder_test.py
[htm]: https://numenta.com/machine-intelligence-technology/
[htm-community]: https://discourse.numenta.org/
[htm-core]: https://github.com/htm-community/htm.core#readme
[lsh]: https://en.wikipedia.org/wiki/Locality-sensitive_hashing
[lvx-simhash-document]: https://luxrota.com/simhash-document-encoder
[numenta]: https://numenta.com
[nupic]: https://github.com/numenta/nupic#readme
[sdr]: https://numenta.com/neuroscience-research/sparse-distributed-representations/
[simhash]: https://en.wikipedia.org/wiki/SimHash
