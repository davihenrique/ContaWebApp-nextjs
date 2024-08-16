import React from 'react';

type MeuComponenteProps = React.PropsWithChildren<{}>;

export default function Grade({ children }: MeuComponenteProps) {
    return (
        <div className="
         bg-black
            bg-opacity-50
            p-8
            rounded-lg
        ">
            {children}
        </div>
    );
}