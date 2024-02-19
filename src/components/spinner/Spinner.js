

const Spinner = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{margin: '0 auto', background: 'none', display: 'block'}} version="1.0" width="64px" height="64px" viewBox="0 0 128 128">
            <g>
            <ellipse cx="64" cy="18.75" rx="6.25" ry="18.75" fill="#ffffff"/><ellipse cx="64" cy="18.75" rx="6.25" ry="18.75" fill="#ffffff" transform="rotate(30 64 64)"/><ellipse cx="64" cy="18.75" rx="6.25" ry="18.75" fill="#e7eaeb" transform="rotate(60 64 64)"/><ellipse cx="64" cy="18.75" rx="6.25" ry="18.75" fill="#d1d6d7" transform="rotate(90 64 64)"/><ellipse cx="64" cy="18.75" rx="6.25" ry="18.75" fill="#b9c1c3" transform="rotate(120 64 64)"/><ellipse cx="64" cy="18.75" rx="6.25" ry="18.75" fill="#a2adb0" transform="rotate(150 64 64)"/><ellipse cx="64" cy="18.75" rx="6.25" ry="18.75" fill="#8b999c" transform="rotate(180 64 64)"/><ellipse cx="64" cy="18.75" rx="6.25" ry="18.75" fill="#748588" transform="rotate(210 64 64)"/><ellipse cx="64" cy="18.75" rx="6.25" ry="18.75" fill="#5c7074" transform="rotate(240 64 64)"/><ellipse cx="64" cy="18.75" rx="6.25" ry="18.75" fill="#455c61" transform="rotate(270 64 64)"/><ellipse cx="64" cy="18.75" rx="6.25" ry="18.75" fill="#2e474c" transform="rotate(300 64 64)"/><ellipse cx="64" cy="18.75" rx="6.25" ry="18.75" fill="#173339" transform="rotate(330 64 64)"/>
                {/* ... остальные ellipses ... */}
                <animateTransform attributeName="transform" type="rotate" values="0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64" calcMode="discrete" dur="1320ms" repeatCount="indefinite"></animateTransform>
            </g>
        </svg>
    );
}

export default Spinner;