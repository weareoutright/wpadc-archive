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
                  yearIcon {
                    node {
                      sourceUrl
                    }
                  }
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
        const years = decade.node.peopleByDecade.years?.map(year => {
            const staffList = year.staffContent ? year.staffContent.replace(/<\/?p>/g, "").replace(/<br\s*\/?>/g, ", ").split(",").map(name => name.trim()).filter(name => name) : [];

            const boardList = year.boardContent ? year.boardContent.replace(/<\/?p>/g, "").replace(/<br\s*\/?>/g, ", ").split(",").map(name => name.trim()).filter(name => name) : [];
            return {
                ...year,
                staffList,
                boardList,
                year: year.year,
                imageUrl: year.yearIcon?.node?.sourceUrl || null,
                imageAlt: year.year
            };
        }) || [];
        return {
            id: decade.node.id,
            decadeTitle: decade.node.peopleByDecade.peopleByDecade,
            years,
            hasYears: years.length > 0
        };
    }) || [];
    return {
        loading,
        error,
        decades: processedDecades || [],
    };
};

export default useDecades;