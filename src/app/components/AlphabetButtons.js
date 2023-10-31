import Link from 'next/link';
import React from 'react'

function AlphabetButtons() {
  return (
    <div>
      
      {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
        <button>
        <Link href={`/alphabet/${letter}`} key={letter}>
          {letter}
        </Link>
        </button>
      ))}

      <button>
      <Link href="/alphabet/all" key="all">
        Show All
      </Link>
      </button>
    </div>
  );
}

export default AlphabetButtons; 

