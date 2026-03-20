export default function CheckerboardPattern() {
	return (
		<div
			className="w-full"
			style={{
				height: '32px',
				backgroundColor: '#0f0f0f',
				backgroundImage: `
					linear-gradient(45deg, #ffffff 25%, transparent 25%),
					linear-gradient(-45deg, #ffffff 25%, transparent 25%),
					linear-gradient(45deg, transparent 75%, #ffffff 75%),
					linear-gradient(-45deg, transparent 75%, #ffffff 75%)
				`,
				backgroundSize: '32px 32px',
				backgroundPosition: '0 0, 0 16px, 16px -16px, -16px 0px',
			}}
			aria-hidden="true"
		>
			<span className="sr-only">Decorative checkerboard pattern</span>
		</div>
	);
}
