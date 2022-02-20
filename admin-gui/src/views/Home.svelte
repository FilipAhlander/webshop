<script>
	import { Table } from 'spaper';
  let result;
	async function getCategories() {
		const url = 'http://localhost:5000/api/categories/'
		const res = await fetch(url);
		const data = await res.json();
		data.sort((a,b) => a.id < b.id ? -1 : 1);
		const payload = data.map((x) => {
			return {
				id: x.id,
				name: x.name,
				edit: `editlink/${x.id}`,
				remove: `removelink/${x.id}`,
			};
		});
		if (res.ok) {
			return payload;
		} else {
			throw new Error(text);
		}
	}

	let promise = getCategories();
</script>

<div>
  {#await promise}¨
	<p>waiting...</p>
	{:then categories}
	<div style="width: 480px; margin: 0 auto;">
		<Table data={categories} hoverable class="margin-top-16"/>
	</div>
	{:catch error}
	<p>{error}</p>
	{/await}
</div>