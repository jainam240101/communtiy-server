import { gql } from "@apollo/client";

export const query=gql`
            query Readme{
                me{
                    uniqueid
                    name
                    enrollment
                    email
                    description
                }
            }
     `