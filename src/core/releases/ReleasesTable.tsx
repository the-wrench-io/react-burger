import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";
import { FormattedMessage } from "react-intl";
import HdesClient from "../context/HdesClient";
import StencilClient from "../context/StencilClient";
import moment from "moment";

interface ReleasesTableProps {
    releases: HdesClient.Entity<HdesClient.AstTag>[] | StencilClient.Release[];
    row: React.FC<{
        release: HdesClient.Entity<HdesClient.AstTag> | StencilClient.Release;
    }>;
}


const ReleasesTable: React.FC<ReleasesTableProps> = ({ releases, row: Row }) => {

    type sortOptions = 'name' | 'created' ;
    type sortDirections = 'asc' | 'desc';
    const [sort, setSort] = React.useState<sortOptions>('name');
    const [direction, setDirection] = React.useState<sortDirections>('desc');

    const isHdesRelease = (release: HdesClient.Entity<HdesClient.AstTag> | StencilClient.Release): release is HdesClient.Entity<HdesClient.AstTag> => {
        return (release as HdesClient.Entity<HdesClient.AstTag>) !== undefined;
    }

    const sortByParam = (param: sortOptions, dir: sortDirections) => {
        switch (param) {
            case 'name':
                releases.sort((a, b) => {
                    const nameA = isHdesRelease(a) ? a.ast?.name : a.body.name;
                    const nameB = isHdesRelease(b) ? b.ast?.name : b.body.name;
                    return (dir === 'asc') ? (nameA.localeCompare(nameB)) : (nameB.localeCompare(nameA));
                });
                break;
            case 'created':
                releases.sort((a, b) =>{
                    const momentA = moment.utc(isHdesRelease(a) ? a.ast?.created : a.body.created).local().format('MM-DD-YYY HH:mm:ss');
                    const momentB = moment.utc(isHdesRelease(b) ? b.ast?.created : b.body.created).local().format('MM-DD-YYY HH:mm:ss');                    
                    const dateA = new Date(momentA);
                    const dateB = new Date(momentB);
                    return (dir === 'asc') ? (dateA.getTime() - dateB.getTime()) : (dateB.getTime() - dateA.getTime());
                });
                break;
            default:
                break;
        }
    };

    const sortByName = () => {
        setSort('name');
        setDirection((direction === 'asc') ? 'desc' : 'asc');
    }

    const sortByCreated = () => {
        setSort('created');
        setDirection((direction === 'asc') ? 'desc' : 'asc');
    }

    sortByParam(sort, direction);

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ p: 1 }}>
                        <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                            <TableSortLabel active={sort === 'name'} direction={direction} onClick={() => sortByName()}>
                                <FormattedMessage id="releases.view.tag" />
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                            <TableSortLabel active={sort === 'created'} direction={direction} onClick={() => sortByCreated()}>
                                <FormattedMessage id="releases.view.created" />
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="left" sx={{ fontWeight: 'bold' }}><FormattedMessage id="releases.view.note" /></TableCell>
                        <TableCell align="center"><FormattedMessage id="releases.view.download" /></TableCell>
                        <TableCell align="right" sx={{ width: "30px" }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {releases.map((release, index) => (<Row key={index} release={release} />))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export type { ReleasesTableProps };
export { ReleasesTable }