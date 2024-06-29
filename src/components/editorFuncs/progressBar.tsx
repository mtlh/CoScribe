export default function ProgressBar( { value }: { value: number; } ) {

    const percentage = () => (value / 5000) * 100;

    console.log(value, percentage());

    return (
        <div style={{ border: '1px solid #000', width: '100%', "border-radius": '5px' }}>
            <div
                style={{
                width: `${percentage()}%`,
                height: '24px',
                background: 'green',
                "border-radius": '5px',
                transition: 'width 0.3s ease-in-out'
                }}
            >
                <span style={{ color: '#fff', padding: '0 10px' }}>{value}</span>
            </div>
        </div>
    );
};