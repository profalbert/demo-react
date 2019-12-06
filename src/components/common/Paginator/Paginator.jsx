import React, {useState, useEffect} from 'react';
import s from "./Paginator.module.css";
import cn from "classnames";


let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {	
	let pagesCount = Math.ceil(totalUsersCount / pageSize);
	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
	  pages.push(i);
	}

	let portionCount = Math.ceil(pagesCount / portionSize);
	let [portionNumber, setPortionNumber] = useState(1);
	let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
	let rightPortionPageNumber = portionNumber * portionSize;

	useEffect(() => {
    setPortionNumber(Math.ceil(currentPage / portionSize));
  }, [currentPage, portionSize]);
	
	return (
		<div className={cn(s.pogination /* и через запятую можно писать
		 классы, так будет намного удобнее с библиотекой cn*/)}>
			{ portionNumber > 1 &&
			  <button className={s.poginatorButton} onClick={() => { setPortionNumber(portionNumber - 1) }}>
					PREV</button> 
			}

			{pages
				.filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)
				.map((p) => {
				return(
					<span className={ cn({[s.selectedPage]:
				  currentPage === p}, s.pageNumber) }
					key={p}
					onClick={() => {onPageChanged(p)}}>{p}</span>
				)
			})}			

			{ portionCount > portionNumber &&
			  <button className={s.poginatorButton} onClick={() => { setPortionNumber(portionNumber + 1) }}>
					NEXT</button> 
			}
	</div>
	)
}


export default Paginator;


