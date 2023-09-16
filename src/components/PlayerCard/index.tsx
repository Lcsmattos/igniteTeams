import ButtonIcon from "@components/ButtonIcon";
import { Container, Icon, PlayerName } from "./styled";

type Props = {
	playerName: string;
	onRemove: () => void;
};

export default function PlayerCard({ playerName, onRemove }: Props) {
	return (
		<Container>
			<Icon name="person" />

			<PlayerName>{playerName}</PlayerName>

			<ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
		</Container>
	);
}
