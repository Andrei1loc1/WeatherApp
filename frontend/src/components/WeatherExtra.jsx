import React from 'react'

function WeatherExtra({weatherData}) {
    if (!weatherData || !weatherData.current) {
        return null;
    }

    const current = weatherData.current;
    const location = weatherData.location;

    return (
        <div className="weather-all">
            <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-color)' }}>
                Detalii Suplimentare
            </h2>
            
            {/* Temperatura simțită și presiunea */}
            <div className="weather-details">
                <div className="detail-item">
                    <div className="detail-label">Senzația termică</div>
                    <div className="detail-value">{current.feelslike_c}°C</div>
                </div>
                <div className="detail-item">
                    <div className="detail-label">Presiunea</div>
                    <div className="detail-value">{current.pressure_mb} mb</div>
                </div>
            </div>

            {/* Vizibilitatea și UV */}
            <div className="weather-details">
                <div className="detail-item">
                    <div className="detail-label">Vizibilitatea</div>
                    <div className="detail-value">{current.vis_km} km</div>
                </div>
                <div className="detail-item">
                    <div className="detail-label">Indicele UV</div>
                    <div className="detail-value">{current.uv}</div>
                </div>
            </div>

            {/* Punctul de rouă și precipitații */}
            <div className="weather-details">
                <div className="detail-item">
                    <div className="detail-label">Punctul de rouă</div>
                    <div className="detail-value">{current.dewpoint_c}°C</div>
                </div>
                <div className="detail-item">
                    <div className="detail-label">Precipitații</div>
                    <div className="detail-value">{current.precip_mm} mm</div>
                </div>
            </div>

            {/* Rafalele de vânt și direcția */}
            <div className="weather-details">
                <div className="detail-item">
                    <div className="detail-label">Rafale vânt</div>
                    <div className="detail-value">{current.gust_kph} km/h</div>
                </div>
                <div className="detail-item">
                    <div className="detail-label">Direcția vânt</div>
                    <div className="detail-value">{current.wind_degree}°</div>
                </div>
            </div>
        </div>
    )
}

export default WeatherExtra 