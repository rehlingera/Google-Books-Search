import React, { Component } from "react";

class NavBar extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <nav>
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo">BookKeeper</a>
                    <ul class="right hide-on-med-and-down">
                        <li><a href="/search"><i class="material-icons left">search</i></a></li>
                        <li><a href="/"><i class="material-icons left">view_module</i></a></li>
                        <li><a href="https://github.com/rehlingera/Google-Books-Search"><i class="material-icons left">code</i></a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;