//import OchreImageMapClient from './ochreImageMapClient.tsx';

export default async function OchreImageMap(params: { uuid: string; }) {
  const { uuid } = params;

  const response = await fetch(
    `https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}&format=json`,
  );

  const data = await response.json();

  const href = `https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}&load`;

  function ClickableRect(area, index) {
    const coords = area.coords.split(',').map(c => Number(c));
    const x = coords[0];
    const y = coords[1];
    const width = coords[2] - coords[0];
    const height = coords[3] - coords[1];
    const href=`https://ochre.lib.uchicago.edu/ochre?uuid=${area.uuid}`;
    const key=`area-${index}`;
    return (
      <a href={href} key={key}>
        <rect 
         x={x} 
         y={y} 
         width={width} 
         height={height} 
         stroke="red" 
         strokeWidth="2px" 
         fill="transparent" 
         vectorEffect="non-scaling-stroke">
          <title>{area.title}</title>
        </rect>
      </a>
    )
  }

  return (
   <svg version="1.1" width="100%" viewBox={`0 0 ${data.ochre.resource.imagemap.width} ${data.ochre.resource.imagemap.height}`} xmlns="http://www.w3.org/2000/svg">
    <image href={href}/>
    { data.ochre.resource.imagemap.area.map((area, index) => ClickableRect(area, index)) }
   </svg>
  );
}
