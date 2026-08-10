import React from 'react';
import ComingSoonNotice from './ComingSoonNotice';

export default class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Sree Vriddhi section error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <ComingSoonNotice
            title="This section is being enhanced"
            message="We could not load this feature right now. The rest of the website remains available while this section is being completed. Please try again later."
          />
        </div>
      );
    }
    return this.props.children;
  }
}
