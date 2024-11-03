import React, { useEffect, useState } from 'react';

function PokemonList() {
    const [x, setX] = useState(0);  // Declare x before useEffect
    const [y, setY] = useState(0);

    useEffect(() => {
        console.log('Effect Called');
    }, [x]);  // Now x is correctly referenced in the dependency array

    return (
        <>
            <div>
                X: {x} <button onClick={() => setX(x + 1)}>Inc</button>
            </div>

            <div>
                Y: {y} <button onClick={() => setY(y + 1)}>Dec</button>
            </div>
        </>
    );
}

export default PokemonList;
