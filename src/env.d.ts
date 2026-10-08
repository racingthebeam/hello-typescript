declare module '*.png' {
    const url: string;
    export default url;
}

declare module '*.jpg' {
    const url: string;
    export default url;
}

declare module '*.svg' {
    const url: string;
    export default url;
}

declare module '*.wasm' {
    const url: string;
    export default url;
}

declare global {
    interface Window {
    };
}

declare const process: {
    env: {
        ENVIRONMENT: string;
    };
}

export { };
