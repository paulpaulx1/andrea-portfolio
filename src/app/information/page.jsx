import styles from "./page.module.css";

export default function InformationPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a
          href="/andrea-callard-cv.pdf"
          download="Andrea_Callard_CV.pdf"
          className={styles.downloadButton}
        >
          Download CV (PDF)
        </a>
      </div>

      <div className={styles.contact}>
        <p>andreacallard@gmail.com</p>
        <p>212.925.8974</p>
      </div>

      <section className={styles.section}>
        <h2>Education</h2>
        <div className={styles.entry}>
          <p>
            <strong>MFA</strong> — 2008, Integrated Media Arts, Film & Media,
            Hunter College, New York City
          </p>
          <p>
            <strong>BFA</strong> — 1972, Painting, San Francisco Art Institute
          </p>
          <p>
            1968-70, Washington University School of Fine Arts in Saint Louis
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Screenings and Performances (partial list)</h2>

        <div className={styles.entry}>
          <h3>2024</h3>
          <p>
            Filmmakers Coop, <em>Lost Shoe Blues</em>, New York City (NYC),
            curated by Matt McKinzie
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2023</h3>
          <p>
            Century of 16mm, commissioned film{" "}
            <em>Visible Spectrum Between Buildings in Saint Louis</em> and two
            preservation presentations, IU Moving Image Archive conference.
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2022-4</h3>
          <p>
            Screening of works from Le Centre National de la Cinematographie du
            Mali (CNCM), films digitized by the XFR Collective, presented at the
            P.I.T. in Williamsburg, NYC.
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2019</h3>
          <p>
            <em>The Times Square Show Slideshow</em>, installation at{" "}
            <em>Basquiat and His New York Scene</em> at The Schunk, Heerlen,
            Netherlands
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2017</h3>
          <p>
            "Lungs of Sugar," installation of three films at OnArte, Minusio,
            Switzerland, curated by Katrin Wolkowicz
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2016</h3>
          <p>
            <em>The Times Square Show Slideshow</em>, installation at the Museum
            Brandhorst. Also, mumok – Museum moderner Kunst Stiftung Ludwig
            Wien. Ludwig,{" "}
            <em>Painting 2.0, Expression in the Information Age</em>
          </p>
          <p>
            <em>Some Food May Be Found in the Desert</em>, Orphans Film
            Symposium and also presentation of archived audio files and an
            installation of <em>Something Medical</em> (2015)
          </p>
          <p>
            An Evening with Andrea Callard, multiple short films at the
            Spectacle Theater in Williamsburg, NYC
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2015</h3>
          <p>
            <em>Something Medical</em> (2015) at Union Docs in Williamsburg, NYC
          </p>
          <p>
            La Petite Versailles, two evenings of XFR Collective material, in
            partnership with Carmel Curtis NYC
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2014-15</h3>
          <p>
            <em>11 thru 12</em> and <em>Fluorescent/Azalea</em>, No Wave series
            curated by Kyle Stephens with Ministry of Culture of Brazil,
            multiple locations throughout Brazil
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2014</h3>
          <p>
            MoRUS Film Festival, <em>Notes on Ailanthus</em>, Women of the Lower
            East Side
          </p>
          <p>Spectacle Theater, "In and Around Collaborative Projects"</p>
          <p>
            Radical Archives Conference, <em>More COLAB TV</em>, NYU
          </p>
          <p>
            New Terrain: 8th Annual Landscape, Space, Place Conference at
            Indiana University, <em>Notes on Ailanthus</em>
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2013</h3>
          <p>
            DOXA, Vancouver,{" "}
            <em>Talking Landscape: Early Media Work 1974-1984</em>
          </p>
          <p>
            Ambulante, screenings of <em>11 thru 12</em> throughout 11 states in
            Mexico
          </p>
          <p>
            <em>11 thru 12</em> and <em>Fluorescent/Azalea</em>, Academy of
            Motion Picture Arts and Sciences Pickford Film Center Linwood Dunn
            Theater, presented by Jeff Lambert of the National Film Preservation
            Foundation
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2012</h3>
          <p>
            Maysles Cinema, NYC, theatrical release{" "}
            <em>Talking Landscape: Early Media Work 1974-1984</em>
          </p>
          <p>
            <em>Times Square Show Revisited</em>,{" "}
            <em>The Times Square Show Slideshow</em>, Hunter College NYC
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2011-12</h3>
          <p>
            <em>11 thru 12</em>, Walker Art Center, Disarming Domesticity,
            curated by Dean Otto
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2011</h3>
          <p>
            Screenings of <em>11 thru 12</em>, <em>Flora Funera</em>,{" "}
            <em>Fluorescent/Azalea</em>, <em>Lost Shoe Blues</em>:
          </p>
          <ul>
            <li>Preserve and Protect, presented by Dan Strieble, MOMA, NYC</li>
            <li>Vera, Groningen, The Netherlands</li>
            <li>WORM, Rotterdam, The Netherlands</li>
            <li>BUTFF, Breda, The Netherlands</li>
            <li>Nova Cinema, Brussels, Belgium</li>
            <li>Amsterdam, The Netherlands</li>
            <li>Glasgow Film Festival</li>
            <li>POP Montreal Commuting from Point to Point</li>
            <li>Wisconsin Film Festival</li>
            <li>Union Docs, NYC</li>
            <li>
              UCLA Film Library Film & Television Archive, Celebrating Orphan
              Films
            </li>
          </ul>
        </div>

        <div className={styles.entry}>
          <h3>2010</h3>
          <p>
            Listening for the Future, audio and radio presentations symposium,
            The American Society of Acoustic Ecology, Chicago
          </p>
          <p>
            Screenings of <em>11 thru 12</em> and/or <em>Fluorescent/Azalea</em>
            :
          </p>
          <ul>
            <li>56th Short Film Festival Oberhausen, Germany</li>
            <li>Austrian Film Museum, Vienna</li>
            <li>Orphans 7 Film Symposium, NYC</li>
            <li>20th Anniversary Celebration, Pleasure Dome, Toronto</li>
            <li>Orphans West, UCLA</li>
            <li>DOC NYC at IFC</li>
            <li>Hebbel Am Ufer, Berlin</li>
          </ul>
        </div>

        <div className={styles.entry}>
          <h3>2009</h3>
          <p>
            GAIA Studio, Wonder Women Residency and exhibiting{" "}
            <em>Comfort with Money, Part 1</em>, at ABC No Rio, NYC
          </p>
          <p>
            Welcome Sound: Audio Art in Roosevelt N.J. Homes,{" "}
            <em>Laughing and Clapping</em>, curator: Viktoria Estok
          </p>
          <p>Giant Ear, monthly segments of online radio</p>
          <p>
            Moving Water, performance and video collaboration with the New York
            Society for Acoustic Ecology & the Wave Farm, Catskill, NY
          </p>
          <p>
            Herd Gathering at the Farm River, parade and performance in
            Branford, CT
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2008</h3>
          <p>
            <em>Repositioning Myself in the Marketplace</em>, CD, monologue and
            field recordings
          </p>
          <p>
            Giant Ear and Inside/Out audio CD, Wave Farm Audio Dispatch Series
            (AD036)
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2007</h3>
          <p>
            Slapp Happy, City Sol Festival, NYC installation with David Watson
          </p>
          <p>Soundlab, Rhizome NYC</p>
        </div>

        <div className={styles.entry}>
          <h3>2006</h3>
          <p>Conflux Festival, Audiobus B61, NYC</p>
          <p>Rhizome/ Surge LIVE, New York</p>
          <p>Observatori Festival, Valencia, Spain</p>
          <p>
            Protest, Transport, Celebrate, New York Society for Acoustic Ecology
          </p>
        </div>

        <div className={styles.entry}>
          <h3>2005</h3>
          <p>Protest, Transport, Celebrate, Media Ballistics, Hunter College</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Films and Videotapes</h2>

        <div className={styles.filmEntry}>
          <p>
            <strong>2025</strong> —{" "}
            <em>Water Log: Immersion, Displacement, Buoyancy</em>, 32 minutes
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>2024</strong> — <em>Wind, Freshkills Park</em>, 8:15 minutes
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>2023</strong> —{" "}
            <em>Visible Spectrum Between Buildings in Saint Louis</em>, 3
            minutes
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>2022</strong> — <em>Bella in the Rain with Landscapes</em>,
            10:24 minutes
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>2008-19</strong> — 120+ short informational or marketing
            films for Green Planet 21 and American Shredding, with 2M+ YouTube
            views
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>2015</strong> — <em>Something Medical</em>, 10 seconds
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>2013</strong> — <em>Sample Map #1</em>, 13 minutes
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>2012</strong> —{" "}
            <em>Talking Landscape: Early Media Work 1974-1984</em>, 73 minutes
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>1999</strong> — <em>Justice</em>, collaborative documentary
            about the Diallo shooting, Hudson Guild
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>1988</strong> — <em>Split Britches</em>, production, set and
            audio design
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>1987</strong> — <em>Bees & Thoroughbreds</em>, editorial
            consultant
          </p>
          <p>
            <em>Landing/ San Diego</em>, work in progress, videotape
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>1985</strong> — <em>Notes on Ailanthus</em>, Super-8, 28
            min.
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>1984</strong> — <em>Pus Factory</em>, animated video
            graphics, 26 sec. b/w. silent
          </p>
          <p>
            <em>Everglades City</em>, editorial & production consultant
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>1981</strong> — Writer & performer, White Columns, video
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>1980</strong> — <em>Freckled Rice</em>, 16mm film by Steve
            Ning, Set design
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>1977</strong> — <em>11 thru 12</em>, Super-8, 12 min.
          </p>
          <p>
            <em>Standard Adult Wheelchair</em>, Super-8, 12 min.
          </p>
          <p>
            <em>Some Food May Be Found in the Desert</em>, Super-8, 8 min.
          </p>
          <p>
            <em>Continental Drift</em>, 16mm film by Paula Longendyke, Set
            design
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>1976</strong> — <em>Fluorescent/Azalea</em>, Super-8, 3 min.
          </p>
          <p>
            <em>Flora Funera (for Battery Park City)</em>, Super-8, 3 min.
          </p>
          <p>
            <em>Lost Shoes Blues</em>, Super-8, 3 min.
          </p>
        </div>

        <div className={styles.filmEntry}>
          <p>
            <strong>1974</strong> — <em>Fragments of a Self-portrait</em>,
            video, b/w, 12 min.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Installations and One or Two Person Exhibitions</h2>

        <div className={styles.entry}>
          <p>
            <strong>2001</strong> — Multiple Connections: Master Printers'
            Portfolios, Bronx River Art Center
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1990</strong> — Home Turf, Art in General, NYC
          </p>
          <p>The Waste Stream, Storefront for Art and Architecture, NYC</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1989</strong> — Town Meeting Series on Housing, Dia Art
            Foundation, NYC
          </p>
          <p>
            The Tenement; Place for Survival, Object of Reform, Museum of
            Chinese in the Americas
          </p>
          <p>Art Awareness, Lexington, NY</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1987</strong> — Pearl River Public Library, Pearl River, NY
          </p>
          <p>Nanuet Public Library, Nanuet, NY</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1984</strong> — New American Landscapes, Mill Gallery,
            Malone, NY
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1983</strong> — Mill Gallery, Malone, NY
          </p>
          <p>Inside/Out, The Garden Signs, Bronx River Art Center, NYC</p>
          <p>Chaos & Fellowship, Chicago Books, NYC</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1982</strong> — NYC Wildlife Museum, Theater Row, 42nd
            Street, NYC
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1981</strong> — White Columns, NYC
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1980</strong> — The Times Square Show, COLAB NYC
          </p>
          <p>Ball State University Art Gallery, Muncie IN</p>
          <p>Site, Cite, Sight, San Francisco, CA</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1979</strong> — Custom & Culture II, Customs House, Creative
            Time, Inc., NYC
          </p>
          <p>Ailanthus Projects, P.S. 1, Special Projects, NYC</p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Group Shows</h2>

        <div className={styles.entry}>
          <p>
            <strong>2023-4</strong> — Avocet Portfolio at the Bronx River Art
            Center, NYC
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2023</strong> — Avocet Portfolio 2023, Kentler International
            Drawing Space, Brooklyn
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2022</strong> — Ruderal Futures, SixtyEight, Copenhagen,{" "}
            <em>Notes on Ailanthus</em>, <em>Flora Funera</em>
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2020</strong> — No More Store, COLAB, James Fuentes Gallery
            NYC
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2019</strong> — Basquiat and His New York Scene,{" "}
            <em>Times Square Slide Show</em>, The Schunk, Heerlen, Netherlands
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2017</strong> — Lungs of Sugar, OnArte, Minusio,
            Switzerland, <em>Flora Funera</em>, <em>Fluorescent/Azalea</em>,{" "}
            <em>Lost Shoe Blues</em>
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2016</strong> — Printed Matter, COLAB's A. More Store
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2012</strong> — COLAB at Printed Matter, NYC
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2001</strong> — Daily Drawings, Kentler International
            Drawing Space, Brooklyn, NY
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2000</strong> — Bronx River Art Center
          </p>
          <p>Art Awareness, Lexington, NY</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1999</strong> — Directors Choice, Bronx River Art Center
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1998</strong> — Studio In A School, The Gallery on E. 53rd,
            NYC
          </p>
          <p>Kentler International Drawing Space, Brooklyn</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1994</strong> — The Future of the Book, University of South
            Florida at Tallahassee
          </p>
          <p>Red Windows, Barney's, NYC</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1993</strong> — ES Vandam, NYC
          </p>
          <p>Exquisite Corpse, The Drawing Center, NYC</p>
          <p>Studio in a School, Artists Space, NYC</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1992</strong> — Arte Roma, Sala 1, Rome
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1990</strong> — Tulip Tree Gallery, Muncie, IN
          </p>
          <p>
            Garbage Out Front: A New Era of Public Design, Municipal Art
            Society, NYC
          </p>
          <p>University Gallery, SUNY, Fredonia, NY</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1989</strong> — Abstract Places, Art in General, NYC
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1988</strong> — Branches, The Boat House in Prospect Park,
            Brooklyn, NY
          </p>
          <p>
            Pacific States National Print Exhibition, University of Hawaii,
            Hilo, Hawaii
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1986</strong> — Rockland Center for the Arts, Rockland
            County, NY
          </p>
          <p>Bronx River Art Center</p>
          <p>Consensus: Art in an Overcrowded City, Exit Art</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1985</strong> — TV and the Artist's Imagination, HBO Studios
            Gallery, NYC
          </p>
          <p>Synaesthetics, Institute for Art & Urban Resources at PS 1, NYC</p>
          <p>It's a Material World, Art Awareness, Lexington, NY</p>
          <p>Prints & Sculpture, Art Awareness, Lexington, NY</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1984</strong> — New American Landscapes, Mill Gallery,
            Malone, NY
          </p>
          <p>Artists' Call, Brooke Alexander Gallery, NYC</p>
          <p>Up with People, COLAB, Concord Gallery, NYC</p>
          <p>A. More Store, COLAB, Jack Tilton Gallery, NYC</p>
          <p>A. More Store, COLAB, Rhona Hoffman Gallery, Chicago</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1983</strong> — The Ritz, COLAB at the Washington Project
            for the Arts, Washington, D.C.
          </p>
          <p>Artists Space, NYC</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1982</strong> — Animal Life, COLAB, Erikson Gallery, NYC
          </p>
          <p>Colab Graphics, SUNY, Purchase, NY</p>
          <p>Mural America, New Harmony Gallery, Indiana (multiple entries)</p>
          <p>Mural America, Randolph Street Gallery, Chicago</p>
          <p>White Columns, NYC</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1981</strong> — White Columns, NYC
          </p>
          <p>
            Ten-Gum Show, Centre D'Art Contemporian, COLAB, Geneva, Switzerland
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1980</strong> — The Times Square Show, COLAB, NYC
          </p>
          <p>Colab Benefit, Brooke Alexander Gallery, NYC</p>
          <p>Animals Living in the City, COLAB - ABC No Rio, NYC</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1979</strong> — Animals Living in the City, Fashion Moda,
            NYC
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1977</strong> — Batman Show, Dog Show, Doctors & Dentists
            Show, Income & Wealth Show, 5 Bleeker Street / 591 Broadway, NYC
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Honors and Grant Prizes</h2>

        <div className={styles.entry}>
          <p>
            <strong>2022-2023</strong> — Preserving Mali's Motion Picture Film
            Heritage, led by Callard and Janet Goldner, a XFR Collective project
            with the Center National de la Cinematographie du Mali, USA Public
            Diplomacy Small Grant (25k)
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2020-2024</strong> — Media preservation awards from National
            Film Preservation Foundation awards for media preservations of works
            on obsolete media by Callard and the XFR Collective
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2014</strong> — New York Women in Film & Television award to
            preserve Callard's <em>Some Food May Be Found in the Desert</em>.
            Further preservations achieved as part of the Moving Image Archiving
            Program (MIAP), New York University (NYU)
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2009</strong> — National Film Preservation Foundation award
            to preserve Callard's films <em>11 thru 12</em> and{" "}
            <em>Fluorescent/Azalea</em>
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2004</strong> — Andrea Callard papers collected by the Fales
            Library & Special Collections NYU
          </p>
          <p>
            Avocet portfolio sponsored by National Endowment for the Arts (NEA)
            and the New York State Council on the Arts (NYSCA)
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1976</strong> — Individual Artist's Fellowship for Drawing,
            National Endowment for the Arts
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1975</strong> — Ball State University Drawing & Small
            Sculpture Show, cash prize
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Residencies and Lectures</h2>

        <div className={styles.entry}>
          <p>
            <strong>1993</strong> — Wake Forest University, Winston Salem, NC
          </p>
          <p>Williams College, Williamstown, MA</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1992-1</strong> — Visiting artist, American Academy in Rome,
            Italy
          </p>
          <p>Art Awareness, Lexington, NY</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1990</strong> — Williams College, Williamstown, MA
          </p>
          <p>The College of Saint Rose, Albany, NY</p>
          <p>Art Awareness, Lexington, NY</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1988</strong> — Baldwinsville Schools, NY Foundation for the
            Arts (NYFA) AIR Project
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1986-7</strong> — Rockland Center for the Arts, NYFA AIR
            Project
          </p>
          <p>Studio in the Schools, Art Partners Project, NYC</p>
          <p>Art Awareness, Lexington, NY</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1985</strong> — Art Awareness, Lexington, NY
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1984</strong> — Virginia Commonwealth University
          </p>
          <p>Center for Media Arts, NYC</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1984-5</strong> — Carthage Central Schools, Black River, NY.
            New York Foundation for the Arts (NYFA) AIR Project
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1983</strong> — Malone Arts Council, Malone, NY. NYFA AIR
            Project
          </p>
          <p>Hecksher Museum & Huntington Public Library, NYFA AIR Project</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1981</strong> — Cummington Community for the Arts,
            Cummington, MA, also '78
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1980</strong> — University of Kentucky, Lexington, KY
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Partial Bibliography</h2>

        <ul className={styles.bibliography}>
          <li>
            Madeleine Anderson, <em>The Insistence of Weeds</em>, Sixty-Eight
            Institute, Copenhagen
          </li>
          <li>
            Katrin Wolkowicz, <em>Re-relating in Art Practice</em>, Rotterdam 2021,{" "}
            <em>Ailanthus Thru Azalea</em>, an interview with Andrea Callard by
            Walter Forsberg, pp. 21-30
          </li>
          <li>
            <em>Magasin, Especes D'Espace</em>, The Eighties First Part, pp.
            178-9
          </li>
          <li>
            Lisa Phillips,{" "}
            <em>The American Century, Art & Culture 1950-2000</em>, Whitney
            Museum, photos: pp.298,291
          </li>
          <li>
            Holland Cotter, "Way Up In the Bronx a Hardy Spirit Blooms" NY
            Times, May 7 1999
          </li>
          <li>
            Robert Kahn, ed.{" "}
            <em>City Secrets Florence, Venice & the Towns of Italy</em>, The
            Little Bookroom 2001, pp. 292, 296, 320, 340, 346
          </li>
          <li>
            Robert Kahn, ed. <em>City Secrets Rome</em>, The Little Bookroom
            1999, pp. 17, 25, 83, 85, 97, 169, 219
          </li>
          <li>
            Peter Bellamy, <em>The Artist Project</em>, IN Publishing, NY 1991,
            pp. 51
          </li>
          <li>
            Roni Henning, <em>Screenprinting: Water-Based Techniques</em>,
            Watson Guptill Publications 1994, pp. 9,24,42,55,67,81,87,103,125
          </li>
          <li>
            Brian Wallis, ed.,{" "}
            <em>
              If You Lived Here...The City in Art, Theory, and Social Activism
            </em>
            , The Dia Art Foundation Bay Press 1991, pp. 300-306
          </li>
          <li>
            Andrea Callard & Sue Darmstedter, "The Idea of Pretty",{" "}
            <em>Artists in Residence - Partners In Education</em>, published by
            the New York Foundation for the Arts, 1989, pp. 25-26
          </li>
          <li>
            Andrea Callard & Sam Sue, "The Tenement; Place for Survival, Object
            of Reform", <em>Real Life Magazine</em>, Winter 88/89, pp. 17-20
          </li>
          <li>
            Andrea Callard, Terminal Clusters, drawing, <em>Bomb Magazine</em>{" "}
            #6, 1983, pp.74
          </li>
          <li>
            John Howell, "Synesthetics" <em>Art Forum</em>, 1985
          </li>
          <li>
            Geurt Imanse, "Colab, Kunst en de Lower Eastside",{" "}
            <em>Metropolis M</em>, Nov.1984, pp.5-6
          </li>
          <li>
            Sarah Booth Conroy, "Art in Raw", <em>Washington Post</em>, May 4,
            1983, pp.87
          </li>
          <li>
            Sylvia Falcon, "Inside/Out", <em>East Village Eye</em>, June 1983,
            pp.33
          </li>
          <li>
            Peter Halley, "Beat, Minimalism, New Wave & Robert Smithson",{" "}
            <em>Arts Magazine</em>, May 1981, pp.120
          </li>
          <li>
            Jeffery Deitch, "Report from Time Square", <em>Art in America</em>,
            9/80. pp.61-3
          </li>
          <li>
            Lucy R. Lippard, "Sex and Death and Shock and Schlock, A Long Review
            of the Times Square Show," <em>Art Forum</em>, October 1980,
            pp.50-55
          </li>
          <li>Grace Glueck, New York Times, May 30, 1980</li>
          <li>Grace Glueck, New York Times, May 4, 1979</li>
          <li>
            John Perrault, "Custom Made" <em>Soho Weekly News</em>, May 17, 1979
          </li>
          <li>
            Willoughby Sharp, <em>Impulse Magazine</em>, Summer 1979, pp.39
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Professional Experience</h2>

        <div className={styles.entry}>
          <p>
            <strong>2016-2020</strong> — Adjunct Assistant Professor, Media Arts
            & Technology, Borough of Manhattan Community College (BMCC) City
            University of New York
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2008-19</strong> — Media Producer, Green Planet 21,
            documenting industrial recycling solutions
          </p>
          <p>
            Adjunct professor, Documentary Photography, Empire State College,
            State University of New York (SUNY)
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2009-10</strong> — Co-leader with Mel Rosenthal, Documentary
            Photography, Women in Photography, and Photojournalism, Empire State
            College, SUNY
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2006-08</strong> — NYC Department of Education, fine art,
            literacy tie-ins, Community School for Social Justice, South Bronx
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1999-04</strong> — NYC Department of Education: fine art
            teaching and art therapy, Project Arts Coordinator, grant writer,
            staff development, District 75, PS 231
          </p>
          <p>AHRC art therapy group leader for adults in recovery</p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1985-98</strong> — Studio In a School: teaching artist,
            staff developer, researcher in over 30 public schools, NYC
          </p>
          <p>
            National Council of Jewish Women, NY Section: Art Coordinator,
            Council Senior Center
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1991-01</strong> — Brant Lake Camp: Key Staff, Director of
            Arts & Crafts
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Service</h2>

        <div className={styles.entry}>
          <p>
            <strong>2024-5</strong> — Co-created in-person screenings in St.
            Louis for the 69th & 70th Flaherty Film Series organized in
            collaboration with Webster University Film Series
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2013-2024</strong> — Founding member and Secretary for the
            XFR Collective, Inc., a non-profit org partnering with artists,
            activists, individuals, & groups to lower the barriers to preserving
            at-risk a/v materials. Numerous projects.
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>2000-2023</strong> — Advisory Board, Kentler International
            Drawing Space, Brooklyn
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1992</strong> — Consultant, Printed Matter
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1990</strong> — Consultant, "From Receiver to Remote
            Control: The TV Set", New Museum of Contemporary Art
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1985-91</strong> — Director, Avocet Portfolio, Art
            Awareness, Lexington, NY
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1989</strong> — panelist, NYC Department of Cultural Affairs
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1987</strong> — Curator, Artist's Window, Chicago Books, NYC
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1984-77</strong> — Officer, Member Collaborative Projects
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1978-80</strong> — Collaborative Projects organizing gang:
            "The Times Square Show"
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1984</strong> — Guest Curator, Mill Gallery, Malone, NY
          </p>
        </div>

        <div className={styles.entry}>
          <p>
            <strong>1980-77</strong> — CO-Director, LINE Association,
            re-granting for artists' books
          </p>
        </div>
      </section>
    </div>
  );
}
