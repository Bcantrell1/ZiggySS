<script>
	let first, last, phone, email, message;

	async function contactUs() {
		console.log(first, last, phone, email, message);
	}
</script>

<section class="prose-xl h-full flex flex-col justify-center">
	<div class="rounded-box text-center">
		<h1>Contact Us</h1>
	</div>
	<form class="pt-6 rounded-box" on:submit|preventDefault={contactUs}>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col py-3">
				<input
					type="text"
					placeholder="First"
					bind:value={first}
					class="input input-bordered w-full"
				/>
			</div>
			<div class="flex flex-col py-3">
				<input
					type="text"
					placeholder="Last"
					bind:value={last}
					class="input input-bordered w-full"
				/>
			</div>
			<div class="flex flex-col py-3">
				<input
					type="text"
					placeholder="Phone"
					bind:value={phone}
					class="input input-bordered w-full"
				/>
			</div>
			<div class="flex flex-col py-3">
				<input
					type="text"
					placeholder="Email"
					bind:value={email}
					class="input input-bordered w-full"
				/>
			</div>
			<div class="flex flex-col py-3 col-span-2">
				<textarea
					bind:value={message}
					class="textarea textarea-bordered h-40"
					placeholder="Have something to tell us?"
				/>
			</div>
		</div>
		<div class="flex align-center justify-center py-4">
			<button type="submit" class="btn btn-primary btn-wide"> Submit </button>
		</div>
	</form>
</section>
