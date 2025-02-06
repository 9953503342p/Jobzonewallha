function SectionRecordsFilter({ _config, onCandidatesPerPageChange }) {
    if (!_config) {
      console.error("SectionRecordsFilter: Missing _config prop.");
      return null;
    }
  
    return (
      <div className="product-filter-wrap d-flex justify-content-between align-items-center m-b30">
        <span className="woocommerce-result-count-left">
          {_config.prefix} {_config.showRange ? `1-${_config.showingUpto} of ` : ""}
          {_config.total} {_config.type}
        </span>
        <form className="woocommerce-ordering twm-filter-select">
          <span className="woocommerce-result-count">Sort By</span>
          <select
            className="wt-select-bar-2 selectpicker"
            data-live-search="true"
            onChange={(e) => onCandidatesPerPageChange(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50, 60].map((count) => (
              <option key={count} value={count}>
                Show {count}
              </option>
            ))}
          </select>
        </form>
      </div>
    );
  }
  
  export default SectionRecordsFilter;
  