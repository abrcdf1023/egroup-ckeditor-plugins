export function createDrawio(writer, drawioUrl) {
  const drawio = writer.createElement('drawio', {
    src: drawioUrl
  });

  return drawio;
}
