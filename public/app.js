var vm;

function init() {

	// Todo: create a proper model layer
	data = localStorage.getItem("items");
	
	var items;

	if (data) {
		items = JSON.parse(localStorage.getItem("items"));
	} else {
		items = [];
	}

	// Routing
	/*const routes = {
		'/': Vue.component('home-component', { template: '<div>Home component!</div>' }),
		'/import': Vue.component('import-component', { template: '<div>Import component!</div>' }),
		'/export': Vue.component('export-component', { template: '<div>Export component!</div>' })
	}*/

	// Custom Counter item component
	Vue.component('counter-item', {
		props: ['item'],
		computed: {
			detailLabel: function() {

				// If no items are present, return: Total: 0
				if (this.item.occurrences.length == 0) {
					return "Totaal " + this.item.occurrences.length;
				}

				// Otherwise, return the first non-zero of the following list:
				// Today, Yesterday, and at most one of: Last Week, Last Month, Last Year, Total
				list = [];

				if (this.today.length > 0) {
					list.push("Vandaag " + this.today.length);
				}

				if (this.yesterday.length > 0) {
					list.push("Gisteren " + this.yesterday.length);
				}

				if (list.length == 2) return list.join(', ')

				if (this.lastWeek.length > 0) {
					list.push("Vorige week " + this.lastWeek.length);
					return list.join(', ');
				}

				if (this.lastMonth.length > 0) {
					list.push("Vorige maand " + this.lastMonth.length);
					return list.join(', ');
				}

				if (this.lastYear.length > 0) {
					list.push("Vorige maand " + this.lastMonth.length);
					return list.join(', ');
				}

				if (this.lastYear.length > 0) {
					list.push("Totaal " + this.item.occurrences.length);
					return list.join(', ');
				}

				return list.join(', ');

			},
			// a computed getter
			today: function () {
				console.log("Calling today")
				return this.item.occurrences.filter(
					function(occurrence) { return moment().isSame(occurrence, 'day')});
			},
			yesterday: function () {
				var yesterday = moment().add(-1, 'days');
				return this.item.occurrences.filter(
					function(occurrence) { return moment(yesterday).isSame(occurrence, 'day') });
			},
			lastWeek: function () {
				var end = moment().add(-1, 'days');
				var start = moment(end).add(-1, 'week');
				return this.item.occurrences.filter(
					function(occurrence) { return moment(occurrence).isBetween(start, end); });
			},
			lastMonth: function () {
				var end = moment().add(-1, 'days');
				var start = moment(end).add(-1, 'month');
				return this.item.occurrences.filter(
					function(occurrence) { return moment(occurrence).isBetween(start, end); });
			},
			lastYear: function () {
				var end = moment().add(-1, 'days');
				var start = moment(end).add(-1, 'year');
				return this.item.occurrences.filter(
					function(occurrence) { return moment(occurrence).isBetween(start, end); });
			}
		},
		methods: {
			increment: function() { 
				this.item.occurrences.push(Date.now());
				localStorage.setItem("items", JSON.stringify(items));
			},
			decrement: function() { 
				this.item.occurrences.pop();
				localStorage.setItem("items", JSON.stringify(items));
			}
		}
	})

	// App component
	vm = new Vue({
		el: '#app',
		data: {
			currentRoute: window.location.pathname,
			items: items,
			newItem: { text: "", occurrences: [] }
		},
		methods: {
			showAddDialog: function() {
				this.$refs.dialog.show();
				this.newItem = { text: "", occurrences: [] };
			},
			onAddAccept: function() {
				items.push(this.newItem);
				localStorage.setItem("items", JSON.stringify(items));
			}
		}/*,
		computed: {
			ViewComponent () {
				return routes[this.currentRoute];// || NotFound
			}
		},
		render(h) { 
			console.log(this.ViewComponent);
			return h(this.ViewComponent) 
		}*/
	});

}
