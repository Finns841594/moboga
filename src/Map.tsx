import { Bubbles } from './components/Bubbles';
import { BubblesDiagram } from './components/BubblesDiagram';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const Map = () => {
	return (
		<>
			<Header />
			<Bubbles />
			{/* <BubblesDiagram /> */}
			<Footer />
		</>
	);
};

export default Map;
