var app = new Vue({
    el: "#app",
    data: function () {
        return {
            param: "",
            links: [],
            total_results: 1000
        };
    },
    methods: {
        search: function(e) {
            secret_key = ""
            console.log(this.param)
            fetch(`https://api.unsplash.com/search/photos?query=${this.param}&client_id=m8QGBvwTVC7MF_HqiCjIY-FXajno0lIUw_fSBHupWeA`).then((response) => response.json()).then(function (data) {
                console.log(data)
                links = []
                for (var i = 0; i < data["results"].length; i++) {
                    this.links.push(data["results"][i]["urls"]["small"])
                };
                total_results = data["total"].toString();
                this.total_results = data["total"].toString()
                img_grid = document.getElementById("img_grid");
                img_grid.innerHTML = "";
                for (var i = 0; i < links.length; i++) {
                    img_card = document.createElement("li")
                    img = document.createElement("img");
                    img_link = document.createElement("a");
                    img.src = links[i]
                    description = document.createElement("p");
                    if (!data["results"][i]["description"]) {
                        description.innerHTML = "No description available"
                    } else {
                        description.innerHTML = data["results"][i]["description"]
                    }

                    likes = document.createElement("p")
                    support = document.createElement("a")
                    if (data["results"][i]["user"]["twitter_username"] == null) {
                        if (data["results"][i]["user"]["social"]["instagram_username"] !== null) {
                        support.textContent = "Follow @" + data["results"][i]["user"]["social"]["instagram_username"]
                        support.href = "https://instagram.com/" + data["results"][i]["user"]["social"]["instagram_username"]
                        };
                    } else {
                        support.textContent = "Follow @" + data["results"][i]["user"]["twitter_username"]
                        support.href = "https://twitter.com/" + data["results"][i]["user"]["twitter_username"]
                    }
                    
                    likes.innerHTML = data["results"][i]["likes"] + " likes"
                    img_link.href = links[i]
                    img_link.appendChild(img);
                    img_card.appendChild(img_link);
                    img_card.appendChild(description);
                    img_card.appendChild(likes);
                    img_card.className = "img_card"
                    img_card.appendChild(support)
                    img_grid.appendChild(img_card);
                }
            })

        },
        // To make sure that hitting enter on the input runs the search() command
        enterListener: function(e) {
            if (e.key == "Enter") {
                this.search()
            }
        }
    }
})