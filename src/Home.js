import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
    const years = [2006, 2007, 2008, 2009, 2010,2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
    const [projects, setProjects] = useState([])
    const [launch_success, setlaunchsuccess] = useState(true)
    const [land_success, setlandsuccess] = useState(true)
    const [launch_year, setlaunchyear] = useState(2014)
    let path = `https://api.spacexdata.com/v3/launches?limit=100&launch_success=${launch_success}&land_success=${land_success}&launch_year=${launch_year}`

    useEffect(() => {
        axios.get(path)
            .then(res => {
                console.log(res.data)
                setProjects(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [launch_success, land_success, launch_year]);
    return (
        <div>
            <h1>SpaceX launch programs</h1>
        <div className="row">
            
            <div className="col-md-2 col-12 filter_block ">
                <div className="bg-white m-2 p-2 text-center">
                    <h3 className="text-left">Filters</h3>
                    <div className="l_y">Launch Year</div>
                    <div className="row m-0">
                    {years.map((year, i) => (
                        <div className="col-6 y_selected pr-0 pl-0" key={i}>
                            <button className={year == launch_year ? 'change_bg':'' } value={year}
                              onClick={e => {
                                  setlaunchyear(e.target.value)
                                   }}>{year}</button>
                            </div>
                        ))}
                    </div>
                    <div className="l_y">Successful-launch</div>
                    <div className="row">
                    <div className="col-6 y_selected pr-0 pl-0">
                        <button className={launch_success ? 'change_bg': ''} onClick={() => setlaunchsuccess(true)}>True</button>
                    </div>
                    <div className="col-6 y_selected pr-0 pl-0">
                        <button className={!launch_success ? 'change_bg': ''} onClick={() => setlaunchsuccess(false)}>False</button>
                    </div>
                    </div>
                    <div className="l_y">Successful-landing</div>
                    <div className="row">
                    <div className="col-6 y_selected pr-0 pl-0">
                        <button className={land_success ? 'change_bg': ''} onClick={() => setlandsuccess(true)}>True</button>
                    </div>
                    <div className="col-6 y_selected pr-0 pl-0">
                        <button className={!land_success ? 'change_bg': ''} onClick={() => setlandsuccess(false)}>False</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="col-md-10 col-12">
                <div className="row m-0">

                    {projects.map((project, i) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 p-1" key={i}>
                            <div className="card">
                                <img className="card-img-top" src={project.links.mission_patch_small} alt="Card" />
                                <div className="card-body">
                                    <div><b>{project.mission_name} #{project.flight_number}</b></div>
                                    <div><b>Mission ids :</b>{project.mission_id}</div>
                                    <div><b>Launch Year :</b>{project.launch_year}</div>
                                    <div><b>Successful Launch :</b>{JSON.stringify(project.launch_success)}</div>
                                    <div><b>Successful Landing :</b>{JSON.stringify(launch_success)}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {projects.length === 0 ? <div className="text-center"><h4>No matchs found</h4></div>:''}
            </div>
        </div>
   
        </div>
        )
}

export default Home
