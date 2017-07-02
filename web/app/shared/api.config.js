// API configurations
var apiConfigURL = {
    "githubBaseURL": "https://api.github.com/",
    "searchUser": "search/users?q=",
    "gistData": "gists"
};

var apiURL = {
    getValue: function(key) {
        return apiConfigURL[key];
    }
};