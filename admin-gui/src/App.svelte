<script>
	import { Navbar, Table } from 'spaper';
	import { Router, Link, Route } from 'svelte-routing';
	import Home from './views/Home.svelte';
</script>

<Router>
	<div class="main">
		<h1>Spaper</h1>
		<Navbar split={false} class="margin-top-32 align-self-center" style="max-width: 80%;">
			<ul class="inline margin-left-16">
				<li><a href="http://localhost:8080">Länk 1</a></li>
				<li><a href="http://localhost:8080">Länk 2</a></li>
				<li><a href="http://localhost:8080">Länk 3</a></li>
			</ul>
		</Navbar>
		<div>
			<Route path="/"><Home /></Route>
		</div>
	</div>
	
</Router>

<style>
	.main {
		text-align: center;
		padding: 1em;
		display: flex;
		flex-direction: column;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		margin: 0;
	}

	@media (min-width: 640px) {
		.main {
			max-width: 80%;
			margin: 0 auto;
		}
	}

</style>
