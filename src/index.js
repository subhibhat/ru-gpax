(() => {
	const data = []
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
		let subj = {
			code: row.cells[2].innerHTML,
			unit: parseInt(row.cells[3].innerHTML),
			grade: gradeToPoint(row.cells[4].innerHTML.trim())
		}

		let index = data.findIndex(item => item.code == subj.code)

		if (index > -1) {
			let oldData = data[index]
			data[index] = oldData.grade > subj.grade ? oldData : subj
		}

		data.push(subj)
	}

	const gPoints = data.map(item => item.unit * item.grade).reduce((prv, cur) => prv + cur)
	const units = data.map(item => item.unit).reduce((prv, cur) => prv + cur)
	const points= parseFloat(gPoints/units).toFixed(2)

	const boxData = document.getElementById('yw0')
	
	boxData.innerHTML = ''
	boxData.classList.add('alert', 'alert-success')
	boxData.setAttribute('style', 'margin-top: 15px')

	boxData.innerHTML = `
	หน่วยกิตรวม: <strong>${units}</strong><br />
	เกรดเฉลี่ย: <strong>${points}</strong>
	`
})()