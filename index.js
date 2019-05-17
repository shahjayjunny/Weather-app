//  you have to sign up , i have used my api for demonstration =>  https://openweathermap.org/ and get your api key from there

const APIKEY = '5cb93651c67cbed9dd9383fa71e3bedf';
let body = document.getElementsByTagName('body')[0]
let arr = []

window.addEventListener('load', () => {
    let locationArr = [];
    let zipArr = [];

    // creating the input tags and button to search

    let location = document.createElement('textarea')
    let zipCode = document.createElement('textarea')
    let btn = document.createElement('button')

    location.setAttribute('placeholder', 'enter city name ')
    zipCode.setAttribute('placeholder', 'enter zip Code ')
    btn.innerHTML = 'Find Weather'

    btn.addEventListener('click', () => {

        // for multiple location Find with CityNames
        let city = location.value;
        let index = 0;

        for (let a = 0; a < city.length; a++) {

            if (city[a] === "\n") {

                let locations = city.slice(index, a);
                locationArr.push(locations);
                index = a + 1;

            } else if (a == city.length - 1) {
                let locations = city.slice(index, a + 1);
                locationArr.push(locations);
            }
        }
        locationArr.forEach(data => {
            if (data !== '') {
                FetchWithLocation(data)
                locationArr = []
            }
        })
        // for multiple location Find with ZipCodes
        let code = zipCode.value;
        let index2 = 0;

        for (let a = 0; a < code.length; a++) {

            if (code[a] === "\n") {

                let zipCode = code.slice(index2, a);
                zipArr.push(zipCode);
                index2 = a + 1;

            } else if (a == code.length - 1) {
                let zipCode = code.slice(index2, a + 1);
                zipArr.push(zipCode);
            }
        }

        zipArr.forEach(data => {
            if (data !== '') {
                FetchWithZipCode(data)
                zipArr = []
            }
        })

    })

    body.appendChild(location);
    body.appendChild(zipCode);
    body.appendChild(btn);

})

// if you search by city then this func will execute

const FetchWithLocation = (location) => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

            for (let i = 0; i < data.weather.length; i++) {
                let obj = {
                    city: data.name,
                    weather: data.weather[i].description,
                    date: time
                }
                arr.push(obj)
            }
            return arr
        })
        .then(obj => {

            var info = document.createElement('p');

            info.innerHTML = `${obj.map(data => {
                return `<h4> Weather Result: </h4>
                <p> Name : ${data.city} <br />
                Description: ${data.weather} <br/>
                Date: ${data.date}
                `
            })}`
            arr = []
            body.appendChild(info)

        })
        .catch(err => {
            console.log(err);

        })
}

//  if you search by zipCode then this func will execute 

const FetchWithZipCode = (zipCode) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${APIKEY}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            if (data.cod == 404) {
                alert(data.message)
            } else {
                let arr = []
                let today = new Date();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

                for (let i = 0; i < data.weather.length; i++) {

                    let obj = {
                        city: data.name,
                        weather: data.weather[i].description,
                        date: time
                    }
                    arr.push(obj)
                }
                return arr
            }
        })
        .then(obj => {
            var info = document.createElement('p');

            info.innerHTML = `${obj.map(data => {
                return `<h4> Weather Result: </h4>
                <p> Name : ${data.city} <br />
                Description: ${data.weather} <br/>
                Date: ${data.date}
                `
            })}`
            arr = []
            body.appendChild(info)

        })
        .catch(err => {
            console.log(err.message);

        })
}


 