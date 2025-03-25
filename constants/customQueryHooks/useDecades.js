import { gql, useQuery } from "@apollo/client";

const GET_DECADES = gql`
    query getDecades {
        decades(last: 10) {
          edges {
            node {
              id
              peopleByDecade {
                peopleByDecade
                years {
                  year
                  boardContent
                  staffContent
                }
              }
            }
          }
        }
    }
    `;

const useDecades = () => {
    const { loading, error, data } = useQuery(GET_DECADES);

    const processedDecades = data?.decades?.edges.map(decade => {
        const decadeTitle = decade.node.peopleByDecade.peopleByDecade || "";
        const decadeId = `decade-${decadeTitle.replace(/\s+/g, '-').toLowerCase()}`;

        const years = decade.node.peopleByDecade.years?.map(year => {
            const staffList = year.staffContent ? year.staffContent.replace(/<\/?p>/g, "").replace(/<br\s*\/?>/g, ", ").split(",").map(name => name.trim()).filter(name => name) : [];
            const boardList = year.boardContent ? year.boardContent.replace(/<\/?p>/g, "").replace(/<br\s*\/?>/g, ", ").split(",").map(name => name.trim()).filter(name => name) : [];

            return {
                ...year,
                staffList,
                boardList,
                year: year.year,
            };
        }) || [];

        years.sort((a, b) => a.year - b.year);
        return {
            id: decade.node.id,
            decadeTitle,
            decadeId,
            years,
            hasYears: years.length > 0
        };
    }) || [];

    processedDecades.sort((a, b) => {
        const getNumericDecade = (title) => parseInt(title.match(/\d+/)?.[0]) || 0;
            return getNumericDecade(a.decadeTitle) - getNumericDecade(b.decadeTitle);
    });
    return {
        loading,
        error,
        decades: processedDecades || [],
    };
};

export default useDecades;