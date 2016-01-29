// ES6 module export example
export function es6Welcome(version) {

	const html =
		`<div class="wrapper" style="width: 90%;margin: 20px auto;">
			<div class="card">
				<p>Hello, this is an <strong>ES${version} module</strong></p>
			</div>
		</div>`;

	const newEl = document.createElement("p");
	newEl.innerHTML = html;
	const es6Content = document.body.appendChild(newEl);
	return es6Content;
}