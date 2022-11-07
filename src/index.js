(() => {
	const list = []
	const tbody= document.querySelector('tbody')
	
	const gradeToPoint = grade => {
		switch (grade) {
			case 'A': return 4; case 'B+': return 3.5;
			case 'B': return 3; case 'C+': return 2.5;
			case 'C': return 2; case 'D+': return 1.5;
			case 'D': return 1; default: return 0;
		}
	}
	
	for (var i = 0, row; row = tbody.rows[i]; i++) {
		let data = {
			code: row.cells[2].innerHTML,
			unit: parseInt(row.cells[3].innerHTML),
			grade: gradeToPoint(row.cells[4].innerHTML.trim())
		}

		let index = list.findIndex(item => item.code == data.code)

		if (index > -1) {
			let oldData = list[index]
			list[index] = oldData.grade > data.grade ? oldData : data
		}

		list.push(data)
	}

	const point = list.map(item => item.unit * item.grade).reduce((prv, cur) => prv + cur)
	const unit = list.map(item => item.unit).reduce((prv, cur) => prv + cur)
	const gpax = parseFloat(point/unit).toFixed(2)

	const boxData = document.getElementById('yw0')
	
	boxData.innerHTML = ''
	boxData.classList.add('alert', 'alert-success')
	boxData.setAttribute('style', 'margin-top: 15px')

	boxData.innerHTML = `
	หน่วยกิตรวม: <strong>${unit}</strong><br />
	เกรดเฉลี่ย: <strong>${gpax}</strong>
	`
})()