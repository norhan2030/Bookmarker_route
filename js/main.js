let sites=[]
let content=document.querySelector(".content");
let nameInput=document.querySelector("#name");
let urlInput=document.querySelector("#url");
let submitBtn=document.querySelector(".submit")

let idOfUpdate=0
let id=1



if(localStorage.getItem("sites")){
  sites=JSON.parse(localStorage.getItem("sites"))
  show()
}

function add(){

//  if(test()){
let site={
  id:sites.length + 1,
  name:nameInput.value,
  url:urlInput.value,
}
sites.push(site)
localStorage.setItem("sites",JSON.stringify(sites))
show()

clearInput()
//  }else{
  // alert("please enter name url")
//  }
}

function clearInput(){
  nameInput.value=""
  urlInput.value=""
}

function show(){
let container=""
  
 for (let i = 0; i < sites.length; i++) {
  container +=`
  <tr>
    <th scope="row">${i+1}</th>
    <td>${sites[i].name}</td>
    
    <td><a href="https://${sites[i].url}" target="_blank"> <button  class="btn bg-warning text-white"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
    <td><button  class="btn bg-success text-white"  onclick="showUpdate(${i})"  type="button"  data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
    <td> <button class="btn bg-danger text-white" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    
  </tr>
  <div class="modal fade blur" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Update</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="text-start">
          <label for="name" class="p-1"><i class="fa-solid fa-book-bookmark pe-2"></i> Site Name</label>
          <input oninput="test(this)" type="text" class="form-control mb-4 updateName" id="name" >
          <label  for="url" class="p-1"><i class="fa-solid fa-link pe-2"></i> Site URL</label>
          <input oninput="test(this)" type="text" class="form-control mb-4 updateUrl" id="url" > 
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onclick="updateData()" class="btn btn-primary" ">Save changes</button>
      </div>
    </div>
  </div>
</div>
  `
 }
 
  content.innerHTML=container
  
}


document.querySelector(".d_name").style.display ="none"
document.querySelector(".d_url").style.display ="none"

function test(tag){
 

  let vali={
     name:/^[A-Za-z]{3,}(\s[A-Za-z]{1,})?(\s[A-Za-z]{1,})?(\s[A-Za-z]{1,})?$/,
     url:/^[A-Za-z]{2,}.[A-Za-z]{2,}$/,
  }
  console.log(tag.name)
if(vali[tag.id].test(tag.value)){
  tag.classList.replace("is-invalid","is-valid")
  console.log("ok")
  if(tag.id=="name" && document.querySelector(".is-valid")){
    document.querySelector(".d_name").style.display ="none"
  }
  if(tag.id=="url" && document.querySelector(".is-valid")){
    document.querySelector(".d_url").style.display ="none"
  }

  
}else{
  console.log("not")
  tag.classList.add("is-invalid")

  let blur=document.querySelector(".blur")
  if(!blur.classList.contains("show")){
    if(tag.id=="name" && document.querySelector(".is-invalid")){
      document.querySelector(".d_name").style.display ="block"
    }
    if(tag.id=="url" && document.querySelector(".is-invalid")){
      document.querySelector(".d_url").style.display ="block"
    }
  }
  
 
}

if(nameInput.classList.contains("is-valid") && urlInput.classList.contains("is-valid")){
  submitBtn.classList.remove("disabled")
}
if(nameInput.classList.contains("is-invalid") || urlInput.classList.contains("is-invalid")){
  submitBtn.classList.add("disabled")
}
}

function deleteSite(index){
  sites.splice(index,1)
  localStorage.setItem("sites",JSON.stringify(sites))
  show()
}

function updateData(){
  
  let updateNameInput=document.querySelector(".updateName");
  let updateUrlInput=document.querySelector(".updateUrl");
  console.log(idOfUpdate)
  
  console.log(updateNameInput.value)

  sites[idOfUpdate].name=updateNameInput.value;
  console.log(updateUrlInput.value)
  sites[idOfUpdate].url=updateUrlInput.value;
  localStorage.setItem("sites",JSON.stringify(sites))
  // window.location.assign("/Bookmarker/index.html")
  let blur=document.querySelector(".modal-backdrop")
  blur.classList.remove("show")
  location.reload();
  show()
  

}
function  showUpdate(index) {

  idOfUpdate=index;
  let updateNameInput=document.querySelector(".updateName");
  let updateUrlInput=document.querySelector(".updateUrl");
  updateNameInput.value=sites[index].name;
  updateUrlInput.value=sites[index].url;

}