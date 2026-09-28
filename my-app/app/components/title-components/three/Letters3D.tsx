import { Text3D, Center, FontData, Billboard } from "@react-three/drei";

export function Letter3D({content, centered, billboard, font, pos, rot}: {
    content: String,
    centered: boolean,
    billboard: boolean,
    font: Number, 
    pos: [number, number, number], 
    rot: [number, number, number]
}) {
    let CurrentFont: string | FontData;

    CurrentFont = "";
    if(font == 0){
        CurrentFont = "/3d/fonts/Calps_Regular.json";
    }else if(font == 1){
        CurrentFont = "/3d/fonts/Barlow Condensed_Bold.json";
    }else if(font == 2){
        CurrentFont = "/3d/fonts/Barlow Condensed_Regular.json";
    }else if(font == 3){
        CurrentFont = "/3d/fonts/Barlow Condensed_Thin.json";
    }


    const HTML = (
        <Text3D
            font={CurrentFont} // Path in your public directory
            size={1}
            height={0.2}            // Extrusion depth
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.03}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
        >
            {content}
            <meshStandardMaterial color="#ffffff" roughness={0.5} metalness={0.3} />
        </Text3D>
    );

    if(!billboard){
        return (
            <Center disableX={!centered} position={pos} rotation={rot}>
                {HTML}
            </Center>
        );
    }else{
        return (
            <Billboard position={pos} follow={true} lockX={false} lockY={false} lockZ={false}>
                <Center disableX={!centered}>
                    {HTML}
                </Center>
            </Billboard>
        );
    }
  
}