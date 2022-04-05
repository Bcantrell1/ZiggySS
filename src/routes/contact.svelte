<script>
	import {
		FluidForm,
		TextInput,
		Button,
		TextArea,
		Grid,
		Row,
		Column
	} from 'carbon-components-svelte';

	let first, last, email, message;

	const contactUs = () => {
		console.log(first, last, email, message);
	};
</script>

<FluidForm>
	<Grid fullWidth noGutter>
		<h1>Contact Us</h1>
		<br />
		<Row>
			<Column>
				<TextInput
					type="text"
					labelText="First Name"
					placeholder="John"
					required
					bind:value={first}
				/>
			</Column>
			<Column>
				<TextInput type="text" labelText="Last Name" placeholder="Doe" required bind:value={last} />
			</Column>
		</Row><br />
		<TextInput labelText="Email" placeholder="johndoe@email.com" required bind:value={email} /><br
		/>
		<TextArea
			labelText="Message"
			placeholder="Have something to tell us?"
			bind:value={message}
		/><br />
		<Button on:click={contactUs}>Login</Button>
	</Grid>
</FluidForm>
