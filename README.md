# OCHRE ImageMap Component

This is a component for displaying OCHRE imagemap data. A raster
image like a photograph contains clickable areas. A button controls
the visibility of these clickable areas.

## Implementation Notes

### Why SVG 1.1?

Image maps using the HTML &lt;map&gt; tag are
[well-supported](https://caniuse.com/?search=map) in modern browsers.
However, they have some limitations that are usually solved with
JavaScript plugins on modern sites. &lt;map&gt; tags are not responsive to different viewport
widths, and support for styling is limited.

Embedding raster image data within an SVG offers these features by default.

### Tab navigation

Users who use keyboard navigation to tab through links on a web page expect
links to be placed in some kind of order on the web page.

This component currently outputs clickable areas in the order in which they
appear in OCHRE data. It would be straightforward within this component to
sort clickable areas from left to right, right to left, top to bottom, bottom
to top, or even clockwise or counter clickwise. However, it seems likely that
we would always need OCHRE editors to be able to manually adjust the order of
these areas within OCHRE itself.

## To Do

Support non-rectangular clickable areas.
