import React, { useEffect, useState } from 'react';

interface QlikConfig {
    host: string;
    prefix: string;
    port: number;
    isSecure: boolean;
}

const QlikMashup: React.FC = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [qlikApp, setQlikApp] = useState<any>(null);

    const config: QlikConfig = {
        host: 'w9mj1mv1plu5dod.in.qlikcloud.com',
        prefix: '/',
        port: 443,
        isSecure: true
    };

    const appId = 'f310dfba-704d-4c21-ae47-4865725ee67e';
    const fieldName = 'Year';

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `${config.isSecure ? 'https://' : 'http://'}${config.host}${config.port ? ':' + config.port : ''}${config.prefix}resources/assets/external/requirejs/require.js`;
        script.async = true;
        
        script.onload = () => {
            initializeQlik();
        };

        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const initializeQlik = () => {
        (window as any).require.config({
            baseUrl: `${config.isSecure ? 'https://' : 'http://'}${config.host}${config.port ? ':' + config.port : ''}${config.prefix}resources`
        });

        (window as any).require(['js/qlik'], function(qlik: any) {
            const app = qlik.openApp(appId, config);
            console.log('Qlik app initialized:', app);
            setQlikApp(app);

            getFieldSelections(app);

            app.field(fieldName).OnData.bind(function() {
                getFieldSelections(app);
            });
        });
    };

    const getFieldSelections = (app: any) => {
        app.field(fieldName).getData().then(function(data: any) {
            const selected = data.rows
                .filter((row: any) => row.qState === 'S')
                .map((row: any) => row.qText);
            
            setSelectedValues(selected);
        });
    };

    return (
        <div className="qlik-mashup">
            <h2>Qlik Field Selections</h2>
            <div>
                <h3>Selected Values in {fieldName}:</h3>
                {selectedValues.length > 0 ? (
                    <ul>
                        {selectedValues.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No selections made</p>
                )}
            </div>
            
            <div id="QV01" style={{ height: '400px', width: '100%' }}></div>
        </div>
    );
};

export default QlikMashup;