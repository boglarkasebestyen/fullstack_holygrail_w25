function PlusMinus(props) {
    function handle(e){
        if(e.target.id.includes('minus')){
            props.handle({name:props.section, value: -1});
            return;    
        }
        props.handle({name:props.section, value: 1});    
    }
    return (
    	<>
            <img src={`icons/${props.section}_plus.png`} id="plus" onClick={((e) => handle(e))}/>
            <img src={`icons/${props.section}_minus.png`} id="minus" onClick={((e) => handle(e))}/>
    	</>
   	);
}

function Data(props) {
    return (
    	<div>
            Header:  {props.data.header}, 
            Footer:  {props.data.footer}
            Article: {props.data.article}, 
            Left:    {props.data.left}, 
            Right:   {props.data.right}, 
    	</div>
    );
}

//new

function update(section, value) {
    return new Promise((resolve, reject) => {
        var url = `/update/${section}/${value}`;  
        //using superagent to resolve that call
        superagent
            .get(url)
            .end(function(err, res){
                err ? reject(null) : resolve(res.body);
            });
    });
}

//new

function read() {
    return new Promise((resolve, reject) => {
        var url = '/data';
        //using superagent to resolve that call
        superagent
            .get(url)
            .end(function(err, res){
                err ? reject(null) : resolve(res.body);
            });
    });
}


function App() {
    const [data, setData]   = React.useState({header:0,footer:0,article:0,left:0,footer:0});    

    React.useEffect(() => {
        // read db data & update UI
        const response = read()
            .then(res => {
                setData(res)
        });        
    }, []);

    function handle(section) {
        //update db & local state
        const response = update(section.name, section.value)
            .then(res => {
                setData(res)
            });
    }

    return (
    	<>
            <div className="grid">        
                <Header  handle={handle} data={data}/>
                <Left    handle={handle} data={data}/>
                <Article handle={handle} data={data}/>
                <Right   handle={handle} data={data}/>
                <Footer  handle={handle} data={data}/>
            </div>
    	</>
   );
}

ReactDOM.render(<App/>, document.getElementById('root'));