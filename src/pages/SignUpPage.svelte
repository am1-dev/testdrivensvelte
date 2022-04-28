<!-- /* 

  script 

*/ -->
<script> 

// import axios from 'axios'

  let disabled = true;
  let username, email, password,passwordRepeat; 

  $: disabled = (password && passwordRepeat) ? password != passwordRepeat :true;
  
  const submit = () => {

   
    // axios.post('/ap1/1.0/users', {username, email, password})
    fetch('/api.1.0/users', {
      method:'POST',
       headers:{ 
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify( {username, email, password})
    })
  }
   
    // console.log( {username, email, password});
        
 

</script>

<!-- /* 

  markup  

*/ -->
<h1> Sign Up </h1>

<form>
  <label for="username">Username</label>
  <input id="username" bind:value={username}/>

  <label for="e-mail">E-mail</label>
  <input id="e-mail" bind:value={email}/>

  <label for="password" >Password</label>
  <input id="password" type="password" bind:value={password}/>

  <label for="password-repeat">Password Repeat</label>
  <input id="password-repeat" type="password" bind:value={passwordRepeat}/>

  <button disabled={disabled} on:click|preventDefault ={submit}>Sign Up</button>
</form>