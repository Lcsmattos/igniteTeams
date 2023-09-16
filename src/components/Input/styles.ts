import styled, { css } from "styled-components/native";
import { Plus } from "phosphor-react-native";
import { TextInput } from "react-native";

export const Container = styled(TextInput)`
	flex: 1;

	min-height: 56px;
	max-height: 56px;

	border-radius: 6px;
	padding: 16px;

	${({ theme }) => css`
		color: ${theme.COLORS.WHITE};
		background-color: ${theme.COLORS.GRAY_700};

		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.MD}px;
	`}
`;

export const AddButton = styled.TouchableOpacity``;

export const Icon = styled(Plus).attrs(({ theme }) => ({
	size: 32,
	color: theme.COLORS.GREEN_700,
	weight: "fill",
}))`
	margin-right: 20px;
`;
