Ejercicios =[
	{
		"id":"[RF 43]",
		"titulo":"Notifications are added to a notification interface, which contains information about:",
		"tipoejercicio":0,
		"tipo":1,
		"subrequisitos":[
			{
				"titulo":"The reason of the notification",
				"tipo":0
			},
			{
				"titulo":"The kind of the notification",
				"tipo":0
			},
			{
				"titulo":"The type of the notification",
				"tipo":0
			},
			{
				"titulo":"The date/time of the notification",
				"tipo":2
			}
		]
	},

	{
		"id":"[RF 44]",
		"titulo":"When the user is able 'take' a notification (locked for others)",
		"tipoejercicio":0,
		"tipo":3,
		"subrequisitos":[
			{
				"titulo":"do the action and mark the notification as 'finished'.",
				"tipo":1
			},
			{
				"titulo":"If the action is finished, the user name is stored in the notification.",
				"tipo":2
			}
		]
	},

	{
		"id":"[FR 12]",
		"titulo":"Loan of bibliographical resources",
		"tipoejercicio":0,
		"tipo":1,
		"subrequisitos":[
			{
				"titulo":"The loan period shall be:",
				"tipo":0
			},
			{
				"titulo":"> 7 days for students and administrative and support staff.",
				"tipo":2
			},
			{
				"titulo":"> 15 days for faculty.",
				"tipo":2
			},
			{
				"titulo":"If the loan period expires on a non-working day, the loan shall BE due on the next working day.",
				"tipo":2
			},
			{
				"titulo":"Suspended users shall not be able to borrow books.",
				"tipo":3
			}
		]
	}
]
 