"use client";
import ReactImageGallery from "react-image-gallery";
export default function ProductDetailPhoto({photo}) {
	return (
		<>
			<ReactImageGallery
				showBullets={false}
				showFullscreenButton={false}
				showPlayButton={false}
				items={photo}
			/>
		</>
	);
}
