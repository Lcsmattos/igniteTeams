import { useNavigation } from "@react-navigation/native";
import logo from "@assets/logo.png";

import { Container, Logo, BackIcon, BackButton } from "./styles";

type Props = {
	showBackButton?: boolean;
};

export default function Header({ showBackButton }: Props) {
	const navigate = useNavigation();

	function handleGoBack() {
		navigate.navigate("groups");
	}

	return (
		<Container>
			{showBackButton && (
				<BackButton onPress={handleGoBack}>
					<BackIcon />
				</BackButton>
			)}

			<Logo source={logo} />
		</Container>
	);
}
