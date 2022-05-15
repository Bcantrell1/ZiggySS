<script>
	// Component imports
	import Error from '$lib/components/Error.svelte';
	// Props
	export let facilities, error;
	// Reactive variable for realtime facility data
	$: first_facility = facilities[0];
</script>

<Error {error} />
<section class="card lg:card-side bg-base-100 shadow-xl">
	<div class="carousel lg:w-1/2 md:w-full h-96 rounded-box">
		<div id="slide1" class="carousel-item relative w-full">
			<img src="/static/facility/adam-winger-c_4LLTtE3mc-unsplash.jpg" class="w-full" alt="" />
			<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<a href="#slide4" class="btn btn-circle">❮</a>
				<a href="#slide2" class="btn btn-circle">❯</a>
			</div>
		</div>
		<div id="slide2" class="carousel-item relative w-full">
			<img src="/static/facility/adam-winger-BnP8bZpiGzQ-unsplash.jpg" class="w-full" alt="" />
			<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<a href="#slide1" class="btn btn-circle">❮</a>
				<a href="#slide3" class="btn btn-circle">❯</a>
			</div>
		</div>
		<div id="slide3" class="carousel-item relative w-full">
			<img src="/static/facility/adam-winger-OpV94f2edwE-unsplash.jpg" class="w-full" alt="" />
			<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<a href="#slide2" class="btn btn-circle">❮</a>
				<a href="#slide4" class="btn btn-circle">❯</a>
			</div>
		</div>
		<div id="slide4" class="carousel-item relative w-full">
			<img src="/static/facility/adam-winger-FJTz_ASf_BI-unsplash.jpg" class="w-full" alt="" />
			<div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
				<a href="#slide3" class="btn btn-circle">❮</a>
				<a href="#slide1" class="btn btn-circle">❯</a>
			</div>
		</div>
	</div>
	<div class="card-body">
		<h2 class="card-title">{first_facility.facility_name}</h2>
		<br />
		<h3>
			{first_facility.facility_street}
		</h3>
		<p>
			{first_facility.facility_city}, {first_facility.facility_state}
			{first_facility.facility_zip}
		</p>
		<p>{first_facility.facility_hours}</p>
		<div class="card-actions justify-end">
			<div class="avatar">
				<div class="w-16 rounded">
					<a href="https://facebook.com/" target="_blank"
						><img src="/static/icons/facebook.svg" alt="Avatar-component" /></a
					>
				</div>
			</div>
			<div class="avatar">
				<div class="w-16 rounded">
					<a href="https://instagram.com/" target="_blank"
						><img src="/static/icons/instagram.svg" alt="Avatar-component" /></a
					>
				</div>
			</div>
			<div class="avatar">
				<div class="w-16 rounded">
					<a href="https://google.com/" target="_blank"
						><img src="/static/icons/google.svg" alt="Avatar-component" /></a
					>
				</div>
			</div>
		</div>
	</div>
</section>
