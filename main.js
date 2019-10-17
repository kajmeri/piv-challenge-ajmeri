//Built using api from https://www.balldontlie.io/#introduction

var url = 'https://www.balldontlie.io/api/v1/players?per_page=10'
var newUrl = ''
var data

//pagination
var page
var totalPages
var totalCount
var perPage

window.onload = function () {
    newUrl = this.url
    runQuery()
}

function filter() {
    var term = document.getElementById("searchTerm").value
    newUrl = url + '&search=' + term
    runQuery()
}

function pageUp() {
    if (page <= totalPages) {
        page++
        document.getElementById("pageNumber").innerHTML = page;
        newUrl = url + '&page=' + page
        runQuery()
    }
}

function pageDown() {
    if (page > 1) {
        page--
        document.getElementById("pageNumber").innerHTML = page;
        newUrl = url + '&page=' + page
        runQuery()
    }
}

function runQuery() {
    var table = document.getElementById("table")

    for (var i = table.rows.length; i > 1; i--) {
        table.deleteRow(i - 1);
    }

    fetch(newUrl)
        .then((response) => response.json())
        .then(json => {
            json = JSON.stringify(json)
            data = JSON.parse(json)

            page = data.meta.current_page
            totalPages = data.meta.total_pages
            totalCount = data.meta.total_count
            perPage = data.meta.per_page

            document.getElementById("pageNumber").innerHTML = page
            document.getElementById("total").innerHTML = totalCount;

        })
        .catch(function (err) {
            console.log(err)
        })

    var tr = table.insertRow(-1);

    for (var i = 0; i < perPage; i++) {
        var keyData = [
            data.data[i].first_name,
            data.data[i].last_name,
            data.data[i].position,
            data.data[i].team.full_name
        ]

        tr = table.insertRow(-1)

        for (var j = 0; j < keyData.length; j++) {

            cell = tr.insertCell(-1)
            cell.innerHTML = keyData[j]
        }

    }
}