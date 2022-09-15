interface PropConfig {
    ROOT_API:string;
    ROOT_API_IMAGE:string;
}
const MODE = 'dev'; 

const CONFIG: PropConfig = {
    ROOT_API: MODE === "dev" ? "http://localhost:5000/api/v1" : "https://apistoregg.herokuapp.com/api/v1",
    ROOT_API_IMAGE:MODE === "dev" ? "http://localhost:5000/images" : "https://apistoregg.herokuapp.com/images",
}

export default CONFIG;