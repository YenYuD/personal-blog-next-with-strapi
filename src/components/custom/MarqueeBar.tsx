import Marquee, { type MarqueeProps } from 'react-fast-marquee';

type Props = {
	children: React.ReactNode;
} & MarqueeProps;

export default function MarqueeBar({ children, ...others }: Props) {
	return <Marquee {...others}>{children}</Marquee>;
}
