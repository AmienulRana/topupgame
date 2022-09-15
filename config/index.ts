interface PropConfig {
    ROOT_API:string;
    ROOT_API_IMAGE:string;
}
const MODE = "prod"; 
 
const CONFIG: PropConfig = {
    ROOT_API: MODE !== "prod" ? "http://localhost:5000/api/v1" : "https://apistoregg.herokuapp.com/api/v1",
    ROOT_API_IMAGE: MODE !== "prod" ? "http://localhost:5000/images" : "https://apistoregg.herokuapp.com/images",
}

export default CONFIG;