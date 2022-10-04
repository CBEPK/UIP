import {Button, Spinner} from 'react-bootstrap';

function SpinnerBtn() {
    return (
        <>
            <Button variant="primary" disabled>
                <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                Loading...
            </Button>
        </>
    );
}

export default SpinnerBtn;
