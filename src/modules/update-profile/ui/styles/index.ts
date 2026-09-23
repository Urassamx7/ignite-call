import { Box, styled, Text } from '@ignite-ui/react'

export const ProfileBox = styled(Box, {
	marginTop: '$6',
	display: 'flex',
	flexDirection: 'column',
	gpa: '$4',

	label: {
		display: 'flex',
		flexDirection: 'column',
		gap: '$2',
	},
})

export const FormAnnotation = styled(Text, {
	color: '$gray200',
	paddingBottom: '$4',
})
