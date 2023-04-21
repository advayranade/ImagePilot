var app = new Vue({
    el: "#app",
    data: function () {
        return {
            param: "",
            links: [],
            total_results: 1000,
            topic: ""
        };
    },
    methods: {
        imgToText: function(e) {
            console.log(e)
        },
        search: function(e) {
            if (this.topic != "") {
                $.ajax(`https://api.unsplash.com/topics/${this.topic}/photos?client_id=m8QGBvwTVC7MF_HqiCjIY-FXajno0lIUw_fSBHupWeA`)
                .done(function(response) {
                    img_grid.innerHTML = ""; 
                    for(let i=0; i<response.length; i++) {
                        console.log("here")
                        img_grid = document.getElementById("img_grid");
                        img_card = document.createElement("li")
                        img = document.createElement("img");
                        img.id= response[i]["id"]
                        img_link = document.createElement("a");
                        img.src = response[i]["urls"]["small"]
                        description = document.createElement("p");
                        description.textContent = response[i]["alt_description"]
                        img_card.className = "img_card"
                        img_card.appendChild(img)
                        img_card.appendChild(description)
                        img_grid.appendChild(img_card)
                    }
                })

            } else {
                console.log(this.param)
            fetch(`https://api.unsplash.com/search/photos?query=${this.param}&client_id=m8QGBvwTVC7MF_HqiCjIY-FXajno0lIUw_fSBHupWeA`)
                .then((response) => response.json())
                .then(function (data) {
                console.log(data)
                links = []
                for (var i = 0; i < data["results"].length; i++) {
                    this.links.push(data["results"][i]["urls"]["small"])
                };
                total_results = data["total"].toString();
                this.total_results = data["total"].toString()
                img_grid = document.getElementById("img_grid");
                img_grid.innerHTML = "";
                if (links.length <= 0) {
                    if(!document.getElementById("no_results")) {
                        no_results = document.createElement("p")
                        no_results.textContent = "We found no results"
                        no_results.id = "no_results"
                        document.getElementById("img_gridDiv").appendChild(no_results)
                    }
                } else {
                    let no_result = document.getElementById("no_results")
                    if (no_result) {
                        no_result.remove()
                    }
                    
                }
                for (var i = 0; i < links.length; i++) {
                    img_card = document.createElement("li")
                    img = document.createElement("img");
                    img.id= data["results"][i]["id"]
                    img_link = document.createElement("a");
                    img.src = links[i]
                    description = document.createElement("p");
                    if (!data["results"][i]["description"]) {
                        description.innerHTML = "No description available"
                    } else {
                        description.innerHTML = data["results"][i]["alt_description"]
                    }

                    likes = document.createElement("p")
                    likes.textContent = `${data["results"][i]["likes"]} likes`
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
            }
            

        },
        // To make sure that hitting enter on the input runs the search() command
        enterListener: function(e) {
            if (e.key == "Enter") {
                this.search()
            }
        },

        randomFind: function(e) {
            console.log("here")
            no_results = document.getElementById("no_results")
            if (no_results) {
                no_results.remove()
            } 
            $.ajax("https://api.unsplash.com/photos/random?client_id=m8QGBvwTVC7MF_HqiCjIY-FXajno0lIUw_fSBHupWeA")
                .done(function(response) {
                    console.log(response);
                    document.getElementById("img_grid").innerHTML = "";
                    img_card = document.createElement("li");
                    img_card.className = "img_card";
                    img = document.createElement("img")
                    img.src = response["urls"]["small"]
                    likes = document.createElement("p")
                    likes.textContent = `${response["likes"]} likes`
                    img_card.appendChild(img)
                    img_card.appendChild(likes)
                    document.getElementById("img_grid").appendChild(img_card)
                })
        },
        window:onload = function() {
            console.log("here")
            $.ajax("https://api.unsplash.com/topics?client_id=m8QGBvwTVC7MF_HqiCjIY-FXajno0lIUw_fSBHupWeA")
                .done(function(response) {
                    for(i=0;i<response.length;i++) {
                        opt = document.createElement("option")
                        opt.textContent = response[i]["title"]
                        opt.value = response[i]["id"]
                        document.getElementById("topics").appendChild(opt);
                        
                    }
                })
        }
    }
})